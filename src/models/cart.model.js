const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  cart_items: [{
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
    image: {
      type: String,
    },
    total: {
      type: Number,
    },
    cart_total: {
      type: Number,
    },
  }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('cart', cartSchema);
