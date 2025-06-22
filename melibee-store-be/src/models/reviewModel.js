const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    images: [String],
    isHidden: { type: Boolean, default: false } // để admin có thể ẩn review vi phạm
}, { timestamps: true });

// Đảm bảo mỗi user chỉ review 1 lần cho 1 sản phẩm
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
