import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "./App";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const { cart, setCart, page, setPage } = useContext(productContext);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=196")
      .then((res) => {
        setProducts(res.data.products);
        setShowProducts(res.data.products);
      })
      .catch((error) => {
        console.log("API ERROR:", error);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const categories = products.map((prod) => prod.category);
      const uniqueCategory = [...new Set(categories)];
      setCategory(uniqueCategory);
    }
  }, [products]);

  useEffect(() => {
    let result = [...products];
    if (selectedCategory !== "all") {
      result = result.filter(
        (prod) => prod.category === selectedCategory
      );
    }
    if (search !== "") {
      result = result.filter(
        (prod) => prod.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }
    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }
    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    if (sort === "name") {
      result.sort((a, b) => a.title(b.title));
    }
    setShowProducts(result);
  }, [products, search, sort, selectedCategory]);

  function addCard(prod) {
    const existing = cart.find((item) => item.id === prod.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === prod.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...prod, count: 1 }]);
    }
  }

  function getByCategory(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <div>
      <nav>
        <h1>FakeStore</h1>
        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/cart")}>🛒 Cart: {cart.length}</button>
        </div>
      </nav>
      <div className="heading">
        <h2>Products</h2>
      </div>
      <div className="filters">
        <input type="text" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)}/>
        <select onChange={getByCategory}>
          <option value="all">All Products</option>
          {category.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select onChange={(event) => setSort(event.target.value)}>
          <option value="">Sort Products</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
      <div className="products">
        {showProducts.map((prod) => (
          <div className="card" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} />
            <div className="card-content">
              <p className="category">{prod.category}</p>
              <h3>{prod.title}</h3>
              <p className="description">{prod.description}</p>
              <div className="details">
                <span className="price">${prod.price}</span>
                <span className="rating"> ⭐ {prod.rating}</span>
              </div>
              <button className="add-to-cart-btn" onClick={() => addCard(prod)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Product;