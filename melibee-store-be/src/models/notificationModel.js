
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    message: String,
    type: { type: String, enum: ["order", "promotion", "system"] },
    isRead: { type: Boolean, default: false },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },// ID đơn hàng
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: "Promotion" },// ID promotion
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);