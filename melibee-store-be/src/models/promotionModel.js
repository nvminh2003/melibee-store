const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: String,
    discountType: { type: String, enum: ["percentage", "fixed"] },
    discountValue: Number,
    minOrderValue: Number,
    maxDiscount: Number,
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true },
    usageLimit: Number,
    usedCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Promotion", PromotionSchema);