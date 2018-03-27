const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();

mongoose.connect(config.db, (err) => {
  if(err){
    console.log(err);
  } else {
    console.log('Connected to DB');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());



const productRoutes = require('./routes/product');
const userRoutes = require('./routes/account');


app.use('/api', productRoutes);
app.use('/api/accounts', userRoutes);

app.listen(config.port, err => {
  console.log('Server is running on port ',config.port);
})
