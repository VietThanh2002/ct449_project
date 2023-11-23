const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll);

router.route("/:id")
    .get(users.findOne)
    .patch(users.update)
    .delete(users.delete);

router.route("/login")
    .post(users.login);

// router.route("/cart")
//     .post(users.addToCart)
//     .get(users.findAllCart)
//     .delete(users.deleteAllProductsFromCart);

// router.route("/cart/:id")
//     .delete(users.deleteProductFromCart)
//     .patch(users.updateProductQuantityFromCart)
    
module.exports = router;