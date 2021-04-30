import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";
import consola from "consola";

//@desc     Create new Order
//@route    POST /api/orders
//access    Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

//@desc     Get Order By ID
//@route    GET /api/orders/:id
//@access    Private

const getOrderById = asyncHandler(async (req, res) => {
  consola.success("Hit order route");
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    consola.success("Found order, retrieving....");
    res.json(order);
  } else {
    consola.error("Nowpe, no order");
    res.status(404);
    throw new Error("Order not Found");
  }
});

//@desc     UPDATE Order to paid
//@route    PUT /api/orders/:id/pay
//@access    Private

const updateOrderToPaid = asynchHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.player.email_address,
    };
    const updatedOrder = await order.save()
    res.json(updatedOrder)

    res.json(updatedOrder)
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
export { addOrderItems, getOrderById, updateOrderToPaid };
