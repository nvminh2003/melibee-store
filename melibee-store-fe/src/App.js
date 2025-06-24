import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import CreateProductForm from "./pages/ProductPage";
import InventoryFilter from "./pages/InventoryPage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px" }}>
      <header>
        <a>
          {/* <CreateProductForm /> */}
          {/* <InventoryFilter /> */}
          <OrderPage />
        </a>
      </header>
    </div>
  );
}

export default App;
