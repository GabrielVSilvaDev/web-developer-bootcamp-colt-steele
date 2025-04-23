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

// const p = new Product({
//     name: 'Ruby Grapefruit', 
//     price: 1.99,
//     category: 'fruit'
// })

// async function saveProduct() {
//     try {
//         const saved = await p.save();
//         console.log(saved);
//     } catch (e) {
//         console.log(e);
//     }
// }

// main().then(() => saveProduct());

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.00,
    category: 'vegetable'
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit'
  },
  {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
  },
  {
    name: 'Organic Celery',
    price: 1.50,
    category: 'vegetable'
  },
  {
    name: 'Chocolate Whe Milk',
    price: 2.69,
    category: 'dairy'
  },
];

async function insertSeedProducts() {
  try {
    const res = await Product.insertMany(seedProducts);
    console.log('Seeded products:', res);
  } catch (e) {
    console.log('Error inserting seed products:', e);
  } finally {
    mongoose.connection.close();
    console.log('Connection closed.');
  }
}

main().then(() => insertSeedProducts());