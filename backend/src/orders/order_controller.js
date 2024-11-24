const Order = require("./order_model");

const CreateAOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error("Error creating order", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params; 
    const orders = await Order.find({ email }).sort({createdAt: -1});; 
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by email", error);
    res.status(500).json({ message: "Failed to fetch orders by email" }); 
  }
};
module.exports = { CreateAOrder, getAllOrders, getOrderByEmail };
