const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    variant: String,
    quantity: { type: Number, default: 0 }, // Số lượng còn trong kho
    reservedQuantity: { type: Number, default: 0 }, // Số lượng đã đặt nhưng chưa giao
    lowStockThreshold: { type: Number, default: 10 }, // Ngưỡng cảnh báo hết hàng
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Inventory", InventorySchema);