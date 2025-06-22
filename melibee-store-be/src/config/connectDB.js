const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // Dừng server nếu kết nối thất bại
    }
};

module.exports = connectDB;
