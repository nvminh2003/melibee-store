const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    inStock: { type: Boolean, default: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, //"Mật Hoa Cà Phê"
    variants: [
        {
            volume: String, // ví dụ: "500ml", "1000ml"
            price: Number,
            originalPrice: Number,
            available: { type: Boolean, default: true }
        }
    ],

}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);