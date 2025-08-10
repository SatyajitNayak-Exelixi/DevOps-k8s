import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  const loadProducts = async () => {
    setTitle("Products");
    const res = await fetch("/api/products");
    const json = await res.json();
    setData(json);
  };

  const loadOrders = async () => {
    setTitle("Orders");
    const res = await fetch("/api/orders");
    const json = await res.json();
    setData(json);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>E-Commerce App</h1>
      <button onClick={loadProducts}>Load Products</button>
      <button onClick={loadOrders}>Load Orders</button>
      <h3>{title}</h3>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            {title === "Products"
              ? `${item.name} - $${item.price}`
              : `Order #${item.id} - Product ID: ${item.product_id}, Qty: ${item.quantity}, Total: $${item.total}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
