const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  order_items: [{
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    product_id: {
      type: Schema.Types.ObjectId,
    },
    brand: {
      type: String,
    },
    image: {
      type: String,
    },
    delivery_date: {
      type: String,
    },
    delivery_fee: {
      type: Number,
    },
    cart_total: {
      type: Number,
    },
  }],
  adderess: {
    type: String,
  },
  payment_mode: {
    type: String,
  },
  total: {
    type: Number,
  },
  phone_number: {
    type: Number,
  },
  order_status: {
    type: String,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('order', orderSchema);
