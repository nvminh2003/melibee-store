const express = require('express');
const router = express.Router();
const { createPaymentUrl, vnpayIpn, vnpayReturn } = require('../controllers/paymentController');

// Route để tạo URL thanh toán VNPay
router.post('/create_payment_url', createPaymentUrl);

// Route để VNPay gọi về (IPN)
router.get('/vnpay_ipn', vnpayIpn);

// Route để người dùng được chuyển về sau khi thanh toán
router.get('/vnpay_return', vnpayReturn);

module.exports = router; 