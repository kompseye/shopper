const express = require('express');
const fs = require('fs');

// our express application (server)
const app = express();

// groceries are the products
const productsNew = [];

// each product has an identifier which is an integer
let productCtr = 1;

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', (req, res) => {
  res.render('pages/index');
});

/**
 * Helper function to import the values of the CSV.
 *
 * @param {*} entry each entry has format "Category,Product,Cost,Comment"
 */
function processCSVEntry(entry) {
  // split the entry by comma to separate the values
  // save the values into a data structure
  const entrySplit = entry.split(',');
  productCtr += 1;
  productsNew.push({
    id: productCtr,
    category: entrySplit[0],
    name: entrySplit[1],
    cost: entrySplit[2],
    comment: entrySplit[3],
  });
}

/**
 * Load data from CSV file.
 */
function readCSVFile() {
  const contents = fs.readFileSync('products.csv', 'utf8');
  contents.split('\n').map(processCSVEntry);
}

/**
 * Helper function to retrieve the products.
 */
function getProducts() {
  if (productsNew.length === 0) {
    // console.log('products need to be loaded!');
    readCSVFile();
  } else {
    // console.log('products already loaded!');
  }
  return productsNew;
}

// list
app.get('/list', (req, res) => {
  res.render('pages/list', {
    products: getProducts(),
  });
});

// list version 2
app.get('/list2', (req, res) => {
  res.render('pages/list2', {
    products: getProducts(),
  });
});

// app/server listens on port 8080
app.listen(8080);
