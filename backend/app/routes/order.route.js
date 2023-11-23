const express = require('express');
const orderController = require('../controllers/order.controller.js');

const router = express.Router();

router.route('/createOrder')
    .post(orderController.createOrder);

router.route('/getOrder/:userId/:orderId')
    .get(orderController.getOrder);

router.route('/getUserOrders/:userId')
    .get(orderController.getUserOrders);

router.route('/getAllOrders')
    .get(orderController.getAllOrders);

router.route('/deleteOrder/:userId/:orderId')
    .delete(orderController.deleteOrder);

router.route('/deleteOrder/:orderId')
    .delete(orderController.deleteOrderById);

module.exports = router;