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


module.exports = {CreateAOrder}