const express = require('express');
const router = express.Router();
const { getMyProfile, updateMyProfile, sendOtp, verifyOtp } = require('../controllers/userController');
const { checkAuthMiddleware, checkPermission } = require('../middleware/middleware');

// Gửi OTP về email (public)
router.post('/send-otp', sendOtp);
// Xác thực OTP và nhận token (public)
router.post('/verify-otp', verifyOtp);

// Các route dưới đây yêu cầu đăng nhập và là customer
router.use(checkAuthMiddleware);
router.use(checkPermission(['customer']));

router.get('/profile', getMyProfile);
router.put('/profile', updateMyProfile);

module.exports = router; 