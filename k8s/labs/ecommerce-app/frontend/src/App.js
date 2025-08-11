import React, { useState, useEffect } from "react";
import "./App.css";


function App() {
  const API_BASE_URL =
    process.env.REACT_APP_API_URL || `${window.location.protocol}//${window.location.host}`;

  const [selectedTab, setSelectedTab] = useState("products"); // 'products' or 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data for the selected tab
  useEffect(() => {
    setError("");
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/${selectedTab}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (selectedTab === "products") setProducts(data);
        else setOrders(data);
      } catch (err) {
        setError(`Failed to load ${selectedTab}: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, API_BASE_URL]);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "200px",
          borderRight: "1px solid #ddd",
          padding: "20px",
          background: "#f5f5f5",
        }}
      >
        <h2>E-commerce</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            onClick={() => setSelectedTab("products")}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedTab === "products" ? "#ddd" : "transparent",
            }}
          >
            Products
          </li>
          <li
            onClick={() => setSelectedTab("orders")}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedTab === "orders" ? "#ddd" : "transparent",
            }}
          >
            Orders
          </li>
        </ul>
        <p style={{ fontSize: "0.9em", marginTop: "20px" }}>
          <strong>API URL:</strong> <br />
          {API_BASE_URL}
        </p>
      </nav>

      {/* Content pane */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</h1>

        {loading && <p>Loading {selectedTab}...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && selectedTab === "products" && (
          <>
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              <ul>
                {products.map((p) => (
                  <li key={p.id}>
                    {p.name} - ${p.price}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {!loading && !error && selectedTab === "orders" && (
          <>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <ul>
                {orders.map((o) => (
                  <li key={o.id}>
                    Order #{o.id} — Product ID: {o.product_id}, Quantity: {o.quantity}, Total: $
                    {o.total}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;

