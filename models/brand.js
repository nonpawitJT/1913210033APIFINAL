const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
   name:  { type: String },
   main_store: {
      location_name :{ type: String },
      address : { type: String },
      phone : { type: String }
    }
  },{collection:"brands"});

  const brand =mongoose.model("Brand",brandSchema)
  brandSchema.virtual('products', {
    ref: 'product', 
    localField: '_id', 
    foreignField: 'brand', 
  });
  
  module.exports = brand