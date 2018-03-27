const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
  versions: []
});

ProductSchema.pre('save', function (next) {
  var product = this;

  product.versions.push({
    title: product.title,
    description: product.description,
    created: product.created
  });

  next();
});

module.exports = mongoose.model('Product', ProductSchema);
