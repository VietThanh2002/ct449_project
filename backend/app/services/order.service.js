const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("order");
        this.client = client;
    }

    async createOrder(userId, cart, address, name, phone, totalMoney) {
        if (!ObjectId.isValid(userId)) {
            throw new Error("Invalid userId");
        }

        const order = {
            userId: new ObjectId(userId),
            cart: JSON.parse(JSON.stringify(cart)),
            orderDate: new Date(),
            address: address,
            name: name,
            phone: phone,
            totalMoney: totalMoney,
            status: "chờ xử lý" 
        };

        const result = await this.Order.insertOne(order);

        return result && result.ops ? result.ops[0] : null;
    }

    async getOrder(userId, orderId) {
        const filter = {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
        };

        const order = await this.Order.findOne(filter);
        return order;
    }

    async getUserOrders(userId) {
        const filter = {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null
           
        };
        const orders = await this.Order.find(filter).toArray();
        return orders;
    }

    async getAllOrders() {
       
        const orders = await this.Order.find({}).toArray();
        return orders;
    }

    async deleteOrder(userId, orderId) {
        const filter = {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
            _id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null
           
        };

        const result = await this.Order.findOneAndDelete(filter);
        return result.value;
    }

    async deleteOrderById(orderId) {
        if (!ObjectId.isValid(orderId)) {
            throw new Error("Invalid orderId");
        }

        const filter = {
            _id: new ObjectId(orderId)
           
        };

        const result = await this.Order.findOneAndDelete(filter);
        return result.value;
    }

    async updateOrderStatus(orderId, newStatus) {
        if (!ObjectId.isValid(orderId)) {
            throw new Error("Invalid orderId");
        }
    
        const filter = { _id: new ObjectId(orderId) };
        const update = { $set: { status: newStatus } };
    
        const result = await this.Order.updateOne(filter, update);
    
        if (result.modifiedCount === 1) {
            // Cập nhật thành công
            return true;
        } else {
            
            return false;
        }
    }
    
}

module.exports = OrderService;
