const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); 
const Product = require('./models/product');
require("dotenv").config();

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.aird589.mongodb.net/farmStand`
    );
    console.log("Connected to MongoDB server successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

main() // Establish connection with MongoDB Atlas


app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index', { products });
});

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  // Ensures schema validations are applied during update
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})

app.listen(port, () => {
  console.log(`APP IS LISTENING ON PORT ${port}`);
});

