import React from "react";
import "./Payment.css";

const Payment = () => {
  const orderData = JSON.parse(localStorage.getItem("pendingOrder")) || {};
  const items = orderData.items || [];
  const amount = orderData.amount || 0;

  const handleDummyPay = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/order/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    if (data.success) {
      localStorage.removeItem("pendingOrder");

      window.location.href = "/myorders";
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-left">
        <h2>Your Order</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <div>
                <b>{item.name}</b> <span>Qty {item.quantity}</span>
              </div>
              <p>${item.price * item.quantity}</p>
            </li>
          ))}
          <li className="total">
            <b>Total</b> <b>${amount}</b>
          </li>
        </ul>
      </div>

      <form className="payment-right" onSubmit={handleDummyPay}>
        <h2>Pay with Card</h2>
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Card Number" required />
        <div className="flex-inputs">
          <input type="text" placeholder="MM/YY" required />
          <input type="text" placeholder="CVV" required />
        </div>
        <input type="text" placeholder="Cardholder Name" required />
        <select>
          <option>India</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>Germany</option>
          <option>France</option>
          <option>Japan</option>
          <option>China</option>
          <option>Brazil</option>
        </select>
        <button type="submit">Pay ${amount}</button>
      </form>
    </div>
  );
};

export default Payment;
