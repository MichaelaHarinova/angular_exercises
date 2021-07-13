

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 9001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.listen(PORT, function () {
});

app.post('/onEdit', function (request, response) {
  console.log(request.body);
  Product.replaceOne({ id: request.body.id }, request.body).then(r =>response.status(200).send({"message": "Data updated"}));
  });

app.get('/products', function (request, response) {
  Product.find().then(products => response.status(200).send(products));
  });


/* Mongoose */
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  productId: Number,
	productName: String,
	productCode: String,
	releaseDate: String,
	description: String,
	price: Number,
	starRating: Number,
	imageUrl: String,
});

const Product = mongoose.model("IProduct", productSchema, "products");


mongoose.connect('mongodb+srv://user:Micha@cluster.y5etb.mongodb.net/APM', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', function (err) {
  console.error("connection error;", err);
});
db.once('open', function () {

  Product.find().then(response => console.log(response, 'products found'));
});