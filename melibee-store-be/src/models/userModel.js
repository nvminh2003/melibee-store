// models/UserSchema.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    loginCode: { type: String }, //mã otp
    loginCodeExpires: { type: Date }, //thời gian hết hạn mã 
    role: {
        type: String,
        enum: ["customer", "admin",],
        default: "customer"
    },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String },
    loginAttempts: { type: Number, default: 0 },//Đếm số lần nhập sai mã OTP – để khóa tạm tài khoản nếu vượt giới hạn
    loginLockedUntil: { type: Date, default: null }, //Thời điểm người dùng bị khóa không thể đăng nhập

    firstName: String,
    lastName: String,
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    address: String,
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);