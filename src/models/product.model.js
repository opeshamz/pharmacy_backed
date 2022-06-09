const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
  },
  category_id: {
    type: Schema.Types.ObjectId,
  },
  sub_category_id: {
    type: Schema.Types.ObjectId,
  },
  brand: {
    type: String,
  },
  SKU: {
    type: String,
  },
  images: {
    type: String,
  },
  age_range: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  views: {
    type: Number,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  dosage: {
    type: String,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('product', productSchema);
