const express = require('express');
const router = express.Router();
const { Coffee, CoffeeType } = require('../models/Coffee'); // Import the models

// Create a new CoffeeType
router.post('/coffee-types', async (req, res) => {
    try {
        const coffeeType = await CoffeeType.create(req.body);
        res.status(201).json(coffeeType);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
});

// Get all CoffeeTypes
router.get('/coffee-types', async (req, res) => {
    try {
        const coffeeTypes = await CoffeeType.find();
        res.json(coffeeTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/coffee-types/:id', async (req, res) => {
    
    try {
        const coffeeType = await CoffeeType.findById(req.params.id);
        
        if (!coffeeType) {
            return res.status(404).json({ message: 'CoffeeType not found' });
        }
        res.json(coffeeType);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Create a new Coffee for a specific CoffeeType
router.post('/coffee-types/:typeId/coffees', async (req, res) => {
    try {
        
        const coffeeType = await CoffeeType.findById(req.params.typeId);
        if (!coffeeType) {
            return res.status(404).json({ message: 'CoffeeType not found' });
        }

        coffeeType.coffees = req.body.coffees; // Assuming req.body.coffees is the new array
        await coffeeType.save();
        res.status(201).json(coffeeType.coffees);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all Coffees for a specific CoffeeType
router.get('/coffee-types/:typeId/coffees', async (req, res) => {
    try {
        const coffeeType = await CoffeeType.findById(req.params.typeId);
        if (!coffeeType) {
            return res.status(404).json({ message: 'CoffeeType not found' });
        }

        res.json(coffeeType.coffees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// You can also add routes for updating and deleting CoffeeTypes and Coffees if needed

module.exports = router;
