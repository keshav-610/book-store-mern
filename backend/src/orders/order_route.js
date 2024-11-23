const express = require("express");
const {
  CreateAOrder,
  getAllOrders,
  getOrderByEmail,
} = require("./order_controller");
const Order = require("./order_model");
const router = express.Router();

router.post("/", CreateAOrder);
router.get("/", getAllOrders);
router.get("/:email", getOrderByEmail);

module.exports = router;
