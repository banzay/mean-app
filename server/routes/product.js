const router = require('express').Router();

const Product = require('../models/product');

router.get('/products', (req, res, next) => {
  const sortType = req.query.date == 'new' ? -1 : 1;
  Product.find({})
    .sort({'created': sortType})
    .exec((err, products) => {
      if(err) {
        return next(err);
      } else {
        res.json({
          success: true,
          message: 'Products delivered',
          products: products
        });
      }
    });
});

router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if(err) throw err;
    if(!product) {
      res.json({
        success: false,
        message: 'There is no product with that ID'
      });
    } else if(product){
      res.json({
        success: true,
        message: 'Here is your product',
        product: product
      });
    }
  });
});

router.post('/products', (req, res, next) => {
    let product = new Product();

    product.title = req.body.title;
    product.description = req.body.description;

    product.save((err, product) => {
      if(err) {
        throw err
      } else {
        res.json({
          success: true,
          message: 'Successfully Added the product'
        });
      }
    });
  });

router.put('/products/:id', (req, res, next) => {
  Product.update({_id: req.params.id}, { $set: {
    title: req.body.title,
    description: req.body.description
  }, $push: { versions: {
    title: req.body.title,
    description: req.body.description
  }}}, {}, (err, product) => {
    if(err) throw err;
    if(!product) {
      res.json({
        success: false,
        message: 'There is no product with that ID'
      });
    } else if(product) {
      res.json({
        success: true,
        message: 'Product updated',
        product: product
      })
    }
  })
})

module.exports = router;
