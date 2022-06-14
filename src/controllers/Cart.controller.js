const Cart = require('../models/cart.model');
const { successResponse } = require('../utils/responses');

class CartController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.e = this.dependencies.errors;
    this.createCart = this.createCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.getAllCart = this.getAllCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async createCart(req, res) {
    const newCart = await Cart.create({
      user_id: req.body.user_id,
      cart_items: [{
        name: req.body.name,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image,
      }],
    });
    for (let i = 0; i < newCart.cart_items.length; i += 1) {
      newCart.cart_items[i].total = newCart.cart_items[i].quantity * newCart.cart_items[i].price;
    }
    newCart.total = newCart.cart_items.reduce((acc, curr) => acc + curr.total, 0);
    newCart.save();

    return successResponse(res, 200, newCart, 'Item added to cart successfully');
  }

  // eslint-disable-next-line class-methods-use-this
  async addToCart(req, res) {
    const { _id } = req.params;
    const cart = await Cart.findById({ _id });
    if (!cart) {
      throw new this.e.BadRequestError('Cart does not exist , please add items to your cart');
    }
    const {
      name, product_id, quantity, price, image,
    } = req.body;
    const cartItem = await Cart.findOne({ cart_items: { $elemMatch: { product_id } } });
    if (cartItem) {
      throw new this.e.BadRequestError('Item already exist in cart, please update the quantity');
    }
    const newCartItem = {
      name, product_id, quantity, price, image,
    };
    newCartItem.total = newCartItem.quantity * newCartItem.price;
    cart.cart_items.push(newCartItem);
    cart.total = cart.cart_items.reduce((acc, curr) => acc + curr.total, 0);
    cart.save();
    return successResponse(res, 200, cart, 'Item added to cart successfully');
  }

  async removeCartItem(req, res) {
    const { _id } = req.params;
    const cart = await Cart.findById({ _id });
    if (!cart) {
      throw new this.e.BadRequestError('Cart does not exist , please add items to your cart');
    }
    const { product_id } = req.body;
    const cartItem = await Cart.findOne({ cart_items: { $elemMatch: { product_id } } });
    if (!cartItem) {
      throw new this.e.BadRequestError('Item does not exist in cart, please add the item to cart');
    }
    const index = cart.cart_items.findIndex((item) => item.product_id === product_id);
    cart.cart_items.splice(index, 1);
    cart.total = cart.cart_items.reduce((acc, curr) => acc + curr.total, 0);
    cart.save();
    return successResponse(res, 200, cart, 'Item removed from cart successfully');
  }

  async getCart(req, res) {
    const { _id } = req.params;
    const cart = await Cart.findById({ _id }).lean();
    if (!cart) {
      throw new this.e.BadRequestError('Cart does not exist , please add items');
    }
    return successResponse(res, 200, cart, 'Your cart has been retrieved successfully');
  }

  async getAllCart(req, res) {
    const carts = await Cart.find({}).lean();
    if (!carts) {
      throw new this.e.BadRequestError('No cart found, please add items to cart');
    }
    return successResponse(res, 200, carts, 'All carts have been retrieved successfully');
  }

  async getCartTotal(req, res) {
    const { _id } = req.params;
    const cart = await Cart.findById({ _id }).lean();
    if (!cart) {
      throw new this.e.BadRequestError('Cart does not exist , please add items');
    }
    const total = cart.cart_items.reduce((acc, curr) => acc + curr.total, 0);
    return successResponse(res, 200, total, 'Total price has been retrieved successfully');
  }

  async deleteCart(req, res) {
    const { _id } = req.params;
    const cart = await Cart.findById({ _id });
    if (!cart) {
      throw new this.e.BadRequestError('Cart does not exist , please add items');
    }
    cart.remove();
    return successResponse(res, 200, cart, 'Cart has been deleted successfully');
  }
}
module.exports = CartController;
