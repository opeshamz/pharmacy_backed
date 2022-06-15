const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  order_information: [{
    ordered_item: {
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
    delivery_fee: {
      type: Number,
    },
    cart_total: {
      type: Number,
    },
    order_date: {
      type: String,
    },
  }],
  delivery_information: [{
    name: {
      type: String,
    },
    adderess: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
  }],
  payment_information: [{
    payment_mode: {
      type: String,
    },
    payment_datails: {
      type: String,
    },
  }],
  total: {
    type: Number,
  },
  order_status: {
    type: String,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('order', orderSchema);
