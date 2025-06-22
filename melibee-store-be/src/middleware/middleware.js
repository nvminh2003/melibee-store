const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Account = require("../models/userModel");
dotenv.config();

const checkAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token?.split(" ")[1] || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const user = await Account.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                status: "Error",
            });
        }

        // Check if account is active
        if (!user.isActive) {
            return res.status(401).json({
                message: "Account is deactivated",
                status: "Error",
            });
        }

        req.account = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const checkPermission = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.account || !req.account.role) {
            return res.status(403).json({ message: "Forbidden: No role assigned" });
        }

        const { role } = req.account;
        if (allowedRoles.includes(role)) {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden: You do not have permission to perform this action" });
        }
    };
};

module.exports = {
    checkAuthMiddleware,      // for any authenticated user
    checkPermission,
};