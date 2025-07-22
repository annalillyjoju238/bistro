import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: true, 
      status: "Processing", 
    });

    await newOrder.save();

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.log("🔥 Order placement error:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};


const verifyOrder = async (req, res) => {
  res.json({ success: false, message: "Stripe is removed, verification skipped" });
};

// user order history
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// all orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching all orders" });
  }
};

// update status of an order
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

// Delete user's order
const deleteAllUserOrders = async (req, res) => {
  try {
    await orderModel.deleteMany({ userId: req.userId });
    res.json({ success: true, message: "Your orders have been deleted!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to delete your orders" });
  }
};


export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  deleteAllUserOrders,
};
