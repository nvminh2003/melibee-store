import React, { useState } from 'react';
import { Table, Typography, Card, Form, Input, Button, Radio, Descriptions, Alert, Divider, Row, Col } from 'antd';
const OrderPage = () => {
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const { Text } = Typography;

    const orderId = '664f1c0d7b6a1b0012a3abcd'; // giả định
    // const totalAmount = 489000;

    const handleFinish = (values) => {
        console.log('Order submitted:', values);
    };


    const products = [
        {
            key: '1',
            name: 'Mật ong rừng nguyên chất',
            variant: '500ml',
            quantity: 2,
            price: 150000
        },
        {
            key: '2',
            name: 'Mật ong rừng nguyên chất',
            variant: '1000ml',
            quantity: 1,
            price: 280000
        },
        {
            key: '3',
            name: 'Combo Mật ong & Trà gừng',
            variant: 'Hộp quà Tết',
            quantity: 1,
            price: 350000
        }
    ];


    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <>
                    <Text strong>{text}</Text><br />
                    <Text type="secondary">Biến thể: {record.variant}</Text>
                </>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString()}₫`
        },
        {
            title: 'Tạm tính',
            key: 'subtotal',
            render: (_, record) => `${(record.price * record.quantity).toLocaleString()}₫`
        }
    ];

    // Tổng tiền:
    const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    return (
        <Card title="Đặt hàng" style={{ maxWidth: 700, margin: '0 auto' }} bordered>
            <Table columns={columns} dataSource={products} pagination={false} />
            <div style={{ textAlign: 'right', marginTop: 10 }}>
                <Text strong>Tổng cộng: </Text>
                <Text strong style={{ color: 'green' }}>{totalAmount.toLocaleString()}₫</Text>
            </div>

            <Divider />

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    receiverName: 'Nguyễn Văn A',
                    phone: '0901234567',
                    shippingAddress: '123 Lê Lợi, Hà Nội',
                    paymentMethod: 'cod'
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="receiverName" label="Tên người nhận" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="shippingAddress" label="Địa chỉ nhận hàng" rules={[{ required: true }]}>
                    <Input.TextArea autoSize />
                </Form.Item>

                <Form.Item name="paymentMethod" label="Phương thức thanh toán">
                    <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
                        <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                        <Radio value="vnpay">Thanh toán VNPay</Radio>
                        <Radio value="manual_bank">Chuyển khoản ngân hàng (Manual)</Radio>
                    </Radio.Group>
                </Form.Item>

                {paymentMethod === 'manual_bank' && (
                    <Alert
                        type="info"
                        showIcon
                        message="Hướng dẫn chuyển khoản"
                        description={
                            <>
                                <Text strong>🏦 Ngân hàng:</Text> Vietcombank<br />
                                <Text strong>🔢 STK:</Text> 123456789<br />
                                <Text strong>👤 Tên:</Text> CTY TNHH ABC<br />
                                <Text strong>📝 Nội dung chuyển khoản (bắt buộc):</Text> <Text copyable>{orderId}</Text><br />

                                <Text type="secondary">Vui lòng chuyển đúng nội dung để chúng tôi xác nhận đơn hàng nhanh chóng.</Text>
                            </>
                        }
                        style={{ marginBottom: 20 }}
                    />
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Xác nhận đặt hàng
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default OrderPage;
