const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name || !req.body?.password) {
        return next(new ApiError(400, "Tên và mật khẩu không được để trống"));
    }

    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo tài khoản admin mới")
        );
    }
};

exports.login = async (req, res, next) => {
    if (!req.body?.name || !req.body?.password) {
        return next(new ApiError(400, "Tên và mật khẩu không được để trống"));
    }

    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.findByCredentials(req.body.name, req.body.password); //.promise
        if (!document) {
            return res.send({});
        }
        const data = {
            id: document._id,
            role: document.role,
            createAt: document.createdAt,
        };
        return res.send(data);
        // console.log(req.body);
    } catch (error) {
        return next(
            new ApiError(500, "Xảy ra lỗi khi đăng nhập")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const adminService = new AdminService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await adminService.findByCredentials(name);
        } else {
            documents = await adminService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất tài khoản admin")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Tài khoản admin không được tìm thấy"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi truy xuất tài khoản admin với id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không được để trống"));
    }

    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Tài khoản admin không được tìm thấy"));
        }
        return res.send({ message: "Tài khoản admin đã được cập nhật thành công"});
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật tài khoản admin với id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Tài khoản admin không được tìm thấy"));
        }
        return res.send({ message: "Tài khoản admin đã được xóa thành công"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Không thể xóa tài khoản admin với id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const deletedCount = await adminService.deleteAll();
        return res.send({
            message: `${deletedCount} Tài khoản admin đã được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả tài khoản admin")
        );
    }
};