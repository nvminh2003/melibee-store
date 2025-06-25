import React, { useState } from "react";
import {
    Card,
    Descriptions,
    Button,
    message,
    Tag,
    Space,
    Typography,
} from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const OrderPayment = () => {
    const [order, setOrder] = useState({
        _id: "685c3b6cab1d6979043c4c4a",
        userId: "685a67aa176bf00550f5160e",
        receiverName: "Nguyễn Văn A",
        phone: "0912345678",
        shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
        items: [
            {
                productId: "68582f07acf4439d1af922e9",
                variant: "500ml",
                quantity: 5,
                price: 150000,
            },
            {
                productId: "68582f07acf4439d1af922e9",
                variant: "1000ml",
                quantity: 5,
                price: 300000,
            },
        ],
        totalAmount: 2250000,
        paymentMethod: "cod",
        isPaid: false,
        status: "pending",
        note: "Giao hàng trong giờ hành chính",
    });

    const handlePayment = () => {
        if (order.isPaid) {
            message.info("Đơn hàng đã được thanh toán trước đó.");
            return;
        }

        const updatedOrder = {
            ...order,
            isPaid: true,
            paidAt: new Date().toISOString(),
            status: "confirmed",
        };
        setOrder(updatedOrder);
        message.success("Cập nhật thanh toán thành công!");
    };

    return (
        <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
            <Title level={3}>Quản lý thanh toán đơn hàng</Title>
            <Card bordered>
                <Descriptions column={1} bordered size="middle">
                    <Descriptions.Item label="Mã đơn hàng">#{order._id}</Descriptions.Item>
                    <Descriptions.Item label="Người nhận">
                        <Space direction="vertical">
                            <Text strong>{order.receiverName}</Text>
                            <Text>SĐT: {order.phone}</Text>
                            <Text>Địa chỉ: {order.shippingAddress}</Text>
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Sản phẩm">
                        <ul style={{ paddingLeft: 20 }}>
                            {order.items.map((item, idx) => (
                                <li key={idx}>
                                    {item.variant} - {item.quantity} x {item.price.toLocaleString("vi-VN")} đ
                                </li>
                            ))}
                        </ul>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú">
                        {order.note || <i>Không có</i>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phương thức thanh toán">
                        <Text>{order.paymentMethod.toUpperCase()}</Text>
                        {order.paymentMethod === "cod" && !order.isPaid && (
                            <Tag color="orange" style={{ marginLeft: 10 }}>
                                Cần xác nhận thủ công
                            </Tag>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tình trạng thanh toán">
                        {order.isPaid ? (
                            <Tag icon={<CheckCircleOutlined />} color="green">
                                Đã thanh toán
                            </Tag>
                        ) : (
                            <Tag icon={<ExclamationCircleOutlined />} color="red">
                                Chưa thanh toán
                            </Tag>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái đơn hàng">
                        <Tag color="blue">{order.status}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        <Text strong>{order.totalAmount.toLocaleString("vi-VN")} đ</Text>
                    </Descriptions.Item>
                </Descriptions>

                <div style={{ marginTop: 24, textAlign: "center" }}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handlePayment}
                        disabled={order.isPaid}
                    >
                        Xác nhận đã thanh toán
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default OrderPayment;
