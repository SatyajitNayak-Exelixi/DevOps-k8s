import React, { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const loadOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="container">
      <header>
        <h1>E-Commerce Demo</h1>
      </header>

      <div>
        <button onClick={loadProducts}>Load Products</button>
        <button onClick={loadOrders}>Load Orders</button>
      </div>

      <div className="output-section">
        {products.length > 0 && (
          <>
            <h2>Products</h2>
            <div className="cards">
              {products.map((p) => (
                <div key={p.id} className="card">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <p><strong>${p.price}</strong></p>
                </div>
              ))}
            </div>
          </>
        )}

        {orders.length > 0 && (
          <>
            <h2>Orders</h2>
            <div className="cards">
              {orders.map((o) => (
                <div key={o.id} className="card">
                  <h3>Order #{o.id}</h3>
                  <p>Customer: {o.customer}</p>
                  <p>Total: <strong>${o.total}</strong></p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer>© 2025 E-Commerce Demo</footer>
    </div>
  );
}

export default App;

