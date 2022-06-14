const Order = require('../models/order.model');
const { successResponse } = require('../utils/responses');

class OrderController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.e = this.dependencies.errors;
    this.createOrder = this.createOrder.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getAllOrder = this.getAllOrder.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async createOrder(req, res) {
    const newOrder = await Order.create({
      user_id: req.body.user_id,
      order_items: [{
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        quantity: req.body.quantity,
        product_id: req.body.product_id,
        image: req.body.image,
        Delivery_date: req.body.Delivery_date,
        delivery_fee: req.body.delivery_fee,
        cart_total: req.body.cart_total,
      }],
      address: req.body.address,
      payment_mode: req.body.payment_mode,
      phone_number: req.body.phone_number,
    });
    const total = req.body.cart_total + req.body.delivery_fee;
    newOrder.total = total;
    newOrder.save();
    return successResponse(res, 200, newOrder, 'Order placed successfully');
  }

  async getOrder(req, res) {
    const { _id } = req.params;
    const order = await Order.findById({ _id }).lean();
    if (!order) {
      throw new this.e.BadRequestError('Order does not exist');
    }
    return successResponse(res, 200, order, 'Order retrieved successfully');
  }

  async getAllOrder(req, res) {
    const orders = await Order.find().lean();
    if (!orders) {
      throw new this.e.BadRequestError('No orders found');
    }
    return successResponse(res, 200, orders, 'All orders retrieved successfully');
  }
}

module.exports = OrderController;
