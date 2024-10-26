const express = require('express');
const cartController = require('../controllers/cart.controller');
// const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/addToCart', cartController.addToCart);
router.get('/getCart/:userId', cartController.getCart);
router.put('/updateQuantity', cartController.updateQuantity);
router.delete('/deleteAll:userId', cartController.deleteAll);
router.delete('/removeItem/:userId/:productId', cartController.removeItem);

module.exports = router;
