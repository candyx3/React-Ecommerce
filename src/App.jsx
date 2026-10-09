import { createContext, useState } from "react";
import "./App.css";
import Product from "./Product";
import CartPage from "./CartPage";
import { Routes, Route } from "react-router-dom";
export const productContext = createContext();
function App() {
  const [cart, setCart] = useState([]);
  return (
    <productContext.Provider value={{cart, setCart}}>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </productContext.Provider>
  );
}
export default App;