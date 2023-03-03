const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: { type: String, required: true, trim: true },
  price: { type: Number },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  colors: { type: Array },
  sizes: { type: Array },
  description: { type: String },

});
const product = mongoose.model("Product", productSchema);

module.exports = product;