const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverName: { type: String, required: true }, //tên nhận hàng
    phone: { type: String, required: true }, //số điện thoại
    shippingAddress: { type: String, required: true }, //địa chỉ nhận hàng
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            variant: String,
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }  // snapshot giá tại thời điểm đặt hàng
        }
    ],
    totalAmount: Number,
    paymentMethod: { type: String, enum: ["cod", "vnpay", "manual_bank"], required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
        default: "pending"
    },

}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);