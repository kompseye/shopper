const express = require('express');
const products = require('./products');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', (req, res) => {
  res.render('pages/index');
});

// about page
app.get('/list', (req, res) => {
  res.render('pages/list', {
    products: products(),
  });
});

app.listen(8080);
