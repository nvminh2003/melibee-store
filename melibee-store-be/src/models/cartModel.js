const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            variant: String,
            quantity: { type: Number, required: true }, //số lượng
            price: { type: Number, required: true } //giá 
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);

