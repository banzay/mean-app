const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

router.post('/signup', (req, res, next) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if(existingUser) {
      res.json({
        success: false,
        message: 'Account with that email is already exist'
      });
    } else {
      user.save();

      var token = jwt.sign({
        user: user
      }, config.secret, {
        expiresIn: '7d'
      });

      res.json({
        success: true,
        message: 'Token created',
        token: token
      });
    }
  });
});


router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) throw err;

    if(!user){
      res.json({
        success: false,
        message: "Authentification failed, User not found"
      });
    } else if(user) {
      var validPassword = user.comparePassword(req.body.password);
      if(!validPassword){
        res.json({
          success: false,
          message: 'Authentification failed. Wrong password'
        })
      } else {
        var token = jwt.sign({
          user: user
        }, config.secret, {
          expiresIn: '7d'
        });
        res.json({
          success: true,
          message: "Token delivered",
          token: token
        });
      }
    }
  });
})

module.exports = router;
