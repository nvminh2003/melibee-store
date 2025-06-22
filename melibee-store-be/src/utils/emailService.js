const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendOtpEmail = async (email, otp, expiresMinutes = 10) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🔐 Mã xác thực đăng nhập - Melibee Store',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 10px;">
                <div style="text-align:center; margin-bottom:20px;">
                <img src="https://res.cloudinary.com/dujnkhgoz/image/upload/v1750596523/Logo-01_dg9kvq.png"
                    alt="Melibee Logo"
                    style="width: 300px; height: auto;" />
                </div>
                <h2 style="color: #5c2d91;">Xin chào,</h2>
                <p style="font-size: 15px; color: #333;">Bạn vừa yêu cầu đăng nhập vào <strong>Melibee Store</strong>.</p>
                <p style="margin: 24px 0; font-size: 16px; color: #000;">Mã xác thực (OTP) của bạn là:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111; text-align: center;">
                    ${otp}
                </div>
                <p style="font-size: 14px; color: #666; margin-top: 24px;">
                    Mã có hiệu lực trong <strong>${expiresMinutes} phút</strong>. Vui lòng không chia sẻ mã này cho bất kỳ ai.
                </p>
                <hr style="margin: 30px 0;" />
                <p style="font-size: 13px; color: #999;">Trân trọng,<br/>Melibee Store</p>
            </div>
        `
    };
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};


module.exports = {
    sendOtpEmail,
};


// const sendResetPasswordEmail = async (email, resetToken) => {
//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Đặt lại mật khẩu - Book Store',
//         html: `
//             <h1>Đặt lại mật khẩu</h1>
//             <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link bên dưới để đặt mật khẩu mới:</p>
//             <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
//             <p>Link này sẽ hết hạn sau 1 giờ.</p>
//             <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
//         `
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         return true;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return false;
//     }
// };