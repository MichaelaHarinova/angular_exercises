
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 9001;

app.use(cors({
  origin: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE' 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

const mongoose = require('mongoose');
const { request } = require('http');
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

app.get('/products', function (request, response) {
  Product.find().then(products => response.status(200).send(products));
  });


app.post('/editProduct', function (request, response) {
  Product.replaceOne({ productId: request.body.productId }, request.body).then(r =>response.status(200).send({"message": "Data updated"}));
  });



app.listen(PORT, function () {
  });
