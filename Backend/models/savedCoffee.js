const mongoose = require('mongoose');

// Define the Coffee Schema
const coffeeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, default: 25.50 },
  volume: { type: String },
  stars: { type: Number },
  image: { type: String },
  desc: { type: String },
});

// Define the CoffeeType Schema
const coffeeTypeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  coffees: [coffeeSchema], // Embed coffee documents
});

// Create Coffee and CoffeeType models
const Coffee = mongoose.model('Coffeesaved', coffeeSchema);
const CoffeeType = mongoose.model('CoffeeTypesaved', coffeeTypeSchema);

module.exports = { Coffee, CoffeeType };
