const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deactivateUser } = require('../controllers/adminController');
const { checkAuthMiddleware, checkPermission } = require('../middleware/middleware');

// All these routes are for authenticated admins
router.use(checkAuthMiddleware);
router.use(checkPermission(['admin']));

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deactivateUser); // Deactivates user

module.exports = router; 