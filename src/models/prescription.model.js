const { Schema, model } = require('mongoose');

const prescriptionSchema = new Schema({
  name: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
  },
  prescription_image: {
    type: String,
  },
  brand: {
    type: String,
  },
  quantity: {
    type: Number,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('prescription', prescriptionSchema);
