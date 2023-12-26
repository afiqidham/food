// Sidebar.jsx
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from local storage on component mount
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");

    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <h3>Orders</h3>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <strong>Order ID:</strong> {order.orderId} <br />
            <strong>Total Amount:</strong> RM{order.totalAmount.toFixed(2)} <br />
            <strong>Items:</strong>
            <ul>
              {order.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.amount} x {item.name} - RM{item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
