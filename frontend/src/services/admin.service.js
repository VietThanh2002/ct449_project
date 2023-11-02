import createApiClient from "./api.service";

class AdminService {
    constructor(baseUrl = "/api/admins") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async deleteAll() {
        const data = (await this.api.delete("/")).data;
        return data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new AdminService();