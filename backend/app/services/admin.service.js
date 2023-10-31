const { ObjectId } = require("mongodb");

class AdminService {
    constructor(client) {
        this.Admin = client.db().collection("admins");
    }

    extractAdminData(payload) {
        const createdAt = new Date();
        const admin = {
            name: payload.name,
            password: payload.password,
            role: payload.role,
            createdAt: createdAt
        };

        // Xóa các trường không xác định
        Object.keys(admin).forEach(
            (key) => admin[key] === undefined && delete admin[key]
        );
        return admin;
    }

    async create(payload) {
        const admin = this.extractAdminData(payload);
        const result = await this.Admin.findOneAndUpdate(
            admin,
            { $set: { "role": "admin" } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findByCredentials(name, password) {
        return await this.Admin.findOne({
            name: name,
            password: password, 
        });
    }

    async findById(id) {
        return await this.Admin.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractAdminData(payload);
        const result = await this.Admin.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Admin.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Admin.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = AdminService;