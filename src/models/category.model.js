const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('category', categorySchema);
