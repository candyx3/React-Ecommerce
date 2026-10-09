import React, { useContext } from "react";
import { productContext } from "./App";
import { useNavigate } from "react-router-dom";
function CartPage() {
  const {cart, setCart} = useContext(productContext);
  const navigate = useNavigate();
  function increase(product) {
    setCart(cart.map((item) => item.id === product.id ? {...item, count: item.count + 1} : item));
  }
  function decrease(product) {
    if (product.count === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(cart.map((item) => item.id === product.id ? {...item, count: item.count - 1} : item));
    }
  }
  return (
    <div>
      <nav>
        <h1>FakeStore</h1>
        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button>🛒 Cart: {cart.length}</button>
        </div>
      </nav>
      <div className="cart-page">
        <h2>My Cart</h2>
        {cart.length === 0 && (<p className="empty-cart">Cart is empty.</p>)}
        {cart.map((prod) => (
          <div className="cart-item" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title}/>
            <h3>{prod.title}</h3>
            <p className="cart-price">${prod.price}</p>
            <div className="quantity">
              <button onClick={() => decrease(prod)}>-</button>
              <span>{prod.count}</span>
              <button onClick={() => increase(prod)}>+</button>
            </div>
            <p>Total: ${(prod.price * prod.count).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CartPage;