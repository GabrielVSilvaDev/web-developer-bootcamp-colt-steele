const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require('./models/product');

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

app.get('/dog', (req, res) => {
  res.send('WOOF!!!')
})

app.listen(port, () => {
  console.log(`APP IS LISTENING ON PORT ${port}`);
});

