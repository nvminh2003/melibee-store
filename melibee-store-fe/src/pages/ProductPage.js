// ✅ Thiết kế giao diện tạo sản phẩm(FE)
// 🔸 Phần chung:
// name: tên sản phẩm – Input

// description: mô tả sản phẩm – Textarea

// images: upload nhiều hình ảnh – Image uploader(multi)

// price: giá mặc định(base price, dùng SEO hoặc khi không có variants) – Input

// inStock: checkbox "Còn hàng"

// 🧪 Checkbox chọn loại sản phẩm:

// [] Sản phẩm Combo

// 🔹 Nếu không phải combo:
// Hiển thị dropdown category chọn danh mục

// Hiển thị danh sách variants dạng table hoặc form list:

// Volume	Giá bán	Giá gốc	Còn bán	Tồn kho(Inventory)
// Input	Input	Input	Checkbox	Input(quantity)

// ✅ Mỗi dòng chính là 1 variant – và quantity chính là tồn kho(quantity trong Inventory).

// 🎁 Nếu là combo:
// ❌ Không hiện trường category

// ✅ Mặc định thêm 1 variant:

// Giao diện có thể như sau:

// Tên combo	Giá bán	Giá gốc	Còn bán	Số lượng tồn kho
// combo(editable)	Input	Input	Checkbox	Input
import React, { useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Checkbox,
    Button,
    Upload,
    Select,
    Table,
    Space,
    Divider
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const defaultVariant = {
    volume: "",
    price: null,
    originalPrice: null,
    available: true,
    quantity: 0
};

const CreateProductForm = ({ categories }) => {
    const [form] = Form.useForm();
    const [isCombo, setIsCombo] = useState(false);
    const [variants, setVariants] = useState([{ ...defaultVariant }]);

    const handleAddVariant = () => {
        setVariants([...variants, { ...defaultVariant }]);
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const handleRemoveVariant = (index) => {
        const newVariants = variants.filter((_, i) => i !== index);
        setVariants(newVariants);
    };

    const handleSubmit = (values) => {
        const payload = {
            ...values,
            variants: variants.map((v) => ({
                volume: v.volume,
                price: v.price,
                originalPrice: v.originalPrice,
                available: v.available,
                quantity: v.quantity,
                isCombo: isCombo
            }))
        };
        console.log("Submit payload:", payload);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ inStock: true }}
        >
            <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Giá mặc định" name="price" rules={[{ required: true }]}>
                <InputNumber min={0} addonAfter="₫" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Còn hàng" name="inStock" valuePropName="checked">
                <Checkbox />
            </Form.Item>

            <Form.Item name="isCombo" valuePropName="checked">
                <Checkbox checked={isCombo} onChange={(e) => setIsCombo(e.target.checked)}>
                    Sản phẩm Combo
                </Checkbox>
            </Form.Item>

            {!isCombo && (
                <Form.Item label="Danh mục" name="category" rules={[{ required: true }]}>
                    <Select placeholder="Chọn danh mục">
                        {categories?.map((cat) => (
                            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
            )}

            <Divider orientation="left">Biến thể</Divider>
            {variants.map((v, index) => (
                <Space key={index} direction="vertical" style={{ display: 'block', marginBottom: 12 }}>
                    <Input
                        placeholder="Dung tích (volume)"
                        value={v.volume}
                        onChange={(e) => handleVariantChange(index, "volume", e.target.value)}
                    />
                    <InputNumber
                        placeholder="Giá bán"
                        value={v.price}
                        onChange={(value) => handleVariantChange(index, "price", value)}
                        style={{ width: "100%" }}
                        addonAfter="₫"
                    />
                    <InputNumber
                        placeholder="Giá gốc"
                        value={v.originalPrice}
                        onChange={(value) => handleVariantChange(index, "originalPrice", value)}
                        style={{ width: "100%" }}
                        addonAfter="₫"
                    />
                    <InputNumber
                        placeholder="Tồn kho"
                        value={v.quantity}
                        onChange={(value) => handleVariantChange(index, "quantity", value)}
                        style={{ width: "100%" }}
                    />
                    <Checkbox
                        checked={v.available}
                        onChange={(e) => handleVariantChange(index, "available", e.target.checked)}
                    >
                        Đang bán
                    </Checkbox>
                    <Button type="link" danger onClick={() => handleRemoveVariant(index)}>
                        Xoá biến thể
                    </Button>
                    <Divider />
                </Space>
            ))}

            <Button icon={<PlusOutlined />} onClick={handleAddVariant} type="dashed" block>
                Thêm biến thể
            </Button>

            <Divider orientation="left">Hình ảnh</Divider>
            <Form.Item label="Hình ảnh" name="images">
                <Upload listType="picture" multiple>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
                    Tạo sản phẩm
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProductForm;
