const express = require("express");
const cors = require("cors");
const productsRoutes = require("./app/routes/product.route");
const usersRoutes = require("./app/routes/user.route");
const orderRoutes = require("./app/routes/order.route");
const cartRoutes = require("./app/routes/cart.route");
const adminRoutes = require("./app/routes/admin.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json()); // server đọc yêu cầu có content/type là json -> đọc nội dung json đưa vào body

app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admins", adminRoutes);
//handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

//Define error-handling middleware last
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to food store application."});
});

module.exports = app;