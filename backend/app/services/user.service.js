const { ObjectId } = require("mongodb");

    class UserService {
        constructor(client) {
        this.User = client.db().collection("users");
    }
    
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractUserData(payload) {
        const createdAt = new Date();

        const user = {
            email: payload.email,
            password: payload.password,
            address: payload.address,
            phone: payload.phone,
            role: payload.role,
            createdAt: createdAt
        };
        
        // Xóa các trường không xác định
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            { email: user.email },
            { $set: user },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async login(payload) {
        const user = await this.findByEmail(payload.email);
        return user;
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByEmail(email) {
        return await this.find({
            email: { $regex: new RegExp(email), $options: "i" },
        });
    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const updateData = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: updateData },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = UserService;