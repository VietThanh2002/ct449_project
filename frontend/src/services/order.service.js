import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }

    async createOrder(userId, cart, address, name, phone, totalMoney) {
        const data = { userId, cart, address, name, phone, totalMoney };
        return (await this.api.post("/createOrder", data)).data;
    }

    async getOrder(userId, orderId) {
        return (await this.api.get(`/getOrder/${userId}/${orderId}`)).data;
    }

    async getUserOrders(userId) {
        return (await this.api.get(`/getUserOrders/${userId}`)).data;
    }

    async getAllOrders() {
        return (await this.api.get("/getAllOrders")).data;
    }

    async deleteOrder(userId, orderId) {
        return (await this.api.delete(`/deleteOrder/${userId}/${orderId}`)).data;
    }
    
    async updateOrderStatus(orderId, newStatus) {
        const data = { newStatus };  // Chuyển newStatus trong phần thân của yêu cầu PUT
        return (await this.api.put(`/${orderId}`, data)).data;  // Điều chỉnh đường dẫn để phản ánh đúng route trên server
    }
}

export default new OrderService();
