const mongoose = require("mongoose");
const Product = require('./models/product');
require("dotenv").config();

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

