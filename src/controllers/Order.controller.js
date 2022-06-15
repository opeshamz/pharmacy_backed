const Order = require('../models/order.model');
const { successResponse } = require('../utils/responses');

class OrderController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.e = this.dependencies.errors;
    this.createOrder = this.createOrder.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getAllOrder = this.getAllOrder.bind(this);
    this.orderStatus = this.orderStatus.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async createOrder(req, res) {
    const newOrder = await Order.create({
      user_id: req.body.user_id,
      order_information: [{
        ordered_item: req.body.ordered_item,
        price: req.body.price,
        brand: req.body.brand,
        quantity: req.body.quantity,
        product_id: req.body.product_id,
        image: req.body.image,
        delivery_fee: req.body.delivery_fee,
        cart_total: req.body.cart_total,
        order_date: req.body.order_date,
      }],
      delivery_information: [{
        name: req.body.name,
        address: req.body.address,
        phone_number: req.body.phone_number,
      }],
      payment_information: [{
        payment_mode: req.body.payment_mode,
        payment_details: req.body.payment_details,
      }],
      order_status: req.body.order_status,
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

  async orderStatus(req, res) {
    const { _id } = req.params;
    const order = await Order.findById({ _id });
    if (!order) {
      throw new this.e.BadRequestError('Order does not exist');
    }
    // eslint-disable-next-line no-unused-expressions
    order.order_status === 'pending' ? order.order_status = 'processing' : order.order_status = 'delivered';
    order.save();
    return successResponse(res, 200, order, 'Order status updated successfully');
  }
}

module.exports = OrderController;
