import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext.jsx";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./MyOrders.css";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(" Error fetching orders:", error);
    }
  };

  const clearMyOrders = async () => {
    try {
      await axios.delete(`${url}/api/order/delete-user-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("All your orders were deleted");
      setData([]);
    } catch (error) {
      alert("Failed to delete orders");
    }
  };


const trackStatus = async (orderId, currentStatus) => {
  if (currentStatus !== "Out for delivery") {
    return;
  }

  const nextStatus = "Delivered";

  try {
    await axios.post(`${url}/api/order/status`, {
      orderId,
      status: nextStatus,
    });

  
    setOrders(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, status: nextStatus } : order
      )
    );
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};



 

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <button className="my-orders-clear-btn" onClick={clearMyOrders}>
         Clear
      </button>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, i) => (
                <span key={i}>
                  {item.name} x {item.quantity}
                  {i !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <p className="order-email">
              <b>Email:</b> {order.address?.email || "N/A"}
            </p>
            <button onClick={() => trackStatus(order._id, order.status)}>
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
