const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const inventoryRoutes = require('./inventoryRoutes');

// Customer routes
router.use('/user', userRoutes);

// Admin routes
router.use('/admin', adminRoutes);

// Category routes
router.use('/category', categoryRoutes);

// Product routes
router.use('/product', productRoutes);

// Inventory routes
router.use('/inventory', inventoryRoutes);

module.exports = router;
