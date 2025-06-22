const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../utils/emailService");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.account.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Get user profile successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, address } = req.body;

        const user = await User.findByIdAndUpdate(
            req.account.id,
            { firstName, lastName, phone, address },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Gửi OTP về email (tự động tạo user nếu chưa có, validate, chống spam)
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Email không hợp lệ." });
        }
        let user = await User.findOne({ email });
        if (user) {
            // Nếu tài khoản bị ban
            if (user.isActive === false) {
                return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin để biết thêm chi tiết." });
            }
        } else {
            // Tạo user mới chỉ với email
            user = await User.create({ email });
        }
        // Kiểm tra nếu đang bị khóa
        if (user.loginLockedUntil && user.loginLockedUntil > new Date()) {
            const minutes = Math.ceil((user.loginLockedUntil - new Date()) / 60000);
            return res.status(403).json({ message: `Tài khoản bị khóa tạm thời. Vui lòng thử lại sau ${minutes} phút.` });
        }
        // Chống spam: chỉ cho gửi OTP mới sau 60s
        if (user.loginCodeExpires && user.loginCode && (user.loginCodeExpires - 9 * 60 * 1000) > Date.now()) {
            const seconds = Math.ceil(((user.loginCodeExpires - 9 * 60 * 1000) - Date.now()) / 1000);
            return res.status(429).json({ message: `Bạn vừa yêu cầu OTP. Vui lòng đợi ${seconds > 0 ? seconds : 60} giây trước khi gửi lại.` });
        }
        // Sinh mã OTP 6 số
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 phút
        // const expires = new Date(Date.now() + 10 * 1000); // 10 giây
        user.loginCode = otp;
        user.loginCodeExpires = expires;
        user.loginAttempts = 0; // reset số lần nhập sai khi gửi OTP mới
        user.loginLockedUntil = null;
        await user.save();
        // Gửi email
        await sendOtpEmail(email, otp, 10);
        res.status(200).json({ message: "OTP đã được gửi về email." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xác thực OTP và trả về JWT token
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        // Kiểm tra nếu đang bị khóa
        if (user.loginLockedUntil && user.loginLockedUntil > new Date()) {
            const minutes = Math.ceil((user.loginLockedUntil - new Date()) / 60000);
            return res.status(403).json({ message: `Tài khoản bị khóa tạm thời. Vui lòng thử lại sau ${minutes} phút.` });
        }
        if (!user.loginCode || !user.loginCodeExpires) return res.status(400).json({ message: "OTP not requested" });
        if (user.loginCodeExpires < new Date()) {
            user.loginCode = null;
            user.loginCodeExpires = null;
            user.loginAttempts = 0;
            user.loginLockedUntil = null;
            await user.save();
            return res.status(400).json({ message: "OTP expired" });
        }
        if (user.loginCode !== otp) {
            user.loginAttempts = (user.loginAttempts || 0) + 1;
            // Nếu nhập sai quá 5 lần, khóa 15 phút
            if (user.loginAttempts >= 5) {
                user.loginLockedUntil = new Date(Date.now() + 15 * 60 * 1000);
                await user.save();
                return res.status(403).json({ message: "Bạn đã nhập sai OTP quá nhiều lần. Tài khoản bị khóa tạm thời 15 phút." });
            }
            await user.save();
            return res.status(400).json({ message: `Invalid OTP. Bạn còn ${5 - user.loginAttempts} lần thử.` });
        }
        // Xác thực thành công, sinh JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
        // Reset OTP và loginAttempts
        user.loginCode = null;
        user.loginCodeExpires = null;
        user.loginAttempts = 0;
        user.loginLockedUntil = null;
        await user.save();
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    sendOtp,
    verifyOtp,
}; 