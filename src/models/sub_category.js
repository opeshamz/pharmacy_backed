const { Schema, model } = require('mongoose');

const subCategorySchema = new Schema({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  priority: {
    type: Number,
  },
  category_id: {
    type: Schema.Types.ObjectId,
  },
  visibility: {
    type: Boolean,
    default: true,
  },

}, { timestamp: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('sub_category', subCategorySchema);
