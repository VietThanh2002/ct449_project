const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcrypt');
//Tạo và lưu trữ một user mới
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Tên không được để trống"));
    }
    if (!req.body?.email) {
        return next(new ApiError(400, "Email không được để trống"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Không đươc để trống mật khẩu"));
    }
    if (!req.body?.phone) {
        return next(new ApiError(400, "Không đươc để trống số điện thoại"));
    }
    if (!req.body?.address) {
        return next(new ApiError(400, "Không đươc để trống địa chỉ"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo tài khoản mới")
        );
    }
}; 

exports.login = async (req, res, next) => {
    // Kiểm tra đầu vào của yêu cầu ở đây
    if (!req.body?.email || !req.body?.password) {
        return next(new ApiError(400, "Email hoặc mật khẩu không hợp lệ"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.login(req.body);

        // Kiểm tra xem có dữ liệu người dùng hay không
        if (document && document.length > 0) {
            // So sánh mật khẩu đã băm
            const passwordIsValid = bcrypt.compareSync(req.body.password, document[0].password);

            if (passwordIsValid && document[0].email === req.body.email) {
                // Tạo mã thông báo JWT
                const token = jwt.sign(
                    {
                        id: document[0]._id,
                        email: document[0].email,
                        role: document[0].role
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: "1h" } // Thời gian hết hạn của mã thông báo 1 giờ
                );
                // Gửi mã thông báo JWT về client
                return res.send({ message: "Đăng nhập thành công!", token, user_id: document[0]._id, role: document[0].role });
            }
        }

        // Xử lý trường hợp đăng nhập không thành công ở đây
        return res.send({ message: "Đăng nhập thất bại!" });

    } catch (error) {
        // Xử lý lỗi nếu có
        return next(new ApiError(500, "Xảy ra lỗi khi đăng nhập"));
    }
};



// Truy xuất tất cả các tài khoản từ cơ sở dữ liệu
exports.findAll =  async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const { email } = req.query;
        if (email) {
            documents = await userService.findByEmail(email);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất tài khoản")
        );
    }

    return res.send(documents);
}; 

// Tìm một tài khoản duy nhất với một id
exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Tài khoản không được tìm thấy"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi truy xuất với id=${req.params.id}`
            )
        );
    }
}; 

// Cập nhật tài khoản theo id
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được để trống!"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (document === null) {
            return next(new ApiError(404, "Tài khoản không được tìm thấy"));
        }
        return res.send({ message: "Tài khoản đã được cập nhật thành công"});
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật tài khoản với id=${req.params.id}`)
        );
    }
}; 

// Xóa tài khoản theo id
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (document === null) {
            return next(new ApiError(404, "Tài khoản không được tìm thấy"));
        }
        return res.send({ message: "Tài khoản đã được xóa thành công"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Không thể xóa tài khoản với id=${req.params.id}`
            )
        );
    }
};


// Xóa tất cả các tài khoản từ CSDL
exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} Tài khoản đã được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả tài khoản")
        );
    }
}; 



