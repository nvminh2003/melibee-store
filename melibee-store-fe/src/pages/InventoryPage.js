import { Input, Row, Col, Checkbox } from "antd";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const InventoryFilter = ({ onFilterChange }) => {
    const [search, setSearch] = useState("");
    const [variant, setVariant] = useState("");
    const [lowStock, setLowStock] = useState(false);

    // Debounce gọi API khi nhập liệu
    const debouncedSearch = debounce(() => {
        // onFilterChange({ search, variant, lowStock });
    }, 400);

    // Gọi lại mỗi khi thay đổi
    useEffect(() => {
        debouncedSearch();
        return () => debouncedSearch.cancel(); // cleanup
    }, [search, variant, lowStock]);

    return (
        <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}>
                <Input
                    placeholder="Tìm sản phẩm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Col>
            <Col span={6}>
                <Input
                    placeholder="Tên biến thể (vd: 500ml)"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                />
            </Col>
            <Col span={6}>
                <Checkbox
                    checked={lowStock}
                    onChange={(e) => setLowStock(e.target.checked)}
                >
                    Cảnh báo tồn kho thấp
                </Checkbox>
            </Col>
        </Row>
    );
};

export default InventoryFilter;
