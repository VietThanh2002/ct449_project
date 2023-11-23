import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }

    async addToCart(userId, productId, quantity) {
        const data = { userId, productId, quantity };
        return (await this.api.post("/addToCart", data)).data;
    }

    async getCart(userId) {
        return (await this.api.post(`/getCart/${userId}`)).data;
    }

    async updateQuantity(userId, productId, quantity) {
        const data = { userId, productId, quantity };
        return (await this.api.put("/updateQuantity", data)).data;
    }

    async deleteAll(userId) {
        return (await this.api.delete(`/deleteAll/${userId}`)).data;
    }

    async removeItem(userId, productId) {
        return (await this.api.delete(`/removeItem/${userId}/${productId}`)).data;
    }
}

export default new CartService();