const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

//Get all foods
router.get('/foods', async (req, res) => {
    try{
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({message: err.message });
    }
});

//Add new food
router.post('/foods', async (req, res) => {
    const food = new Food({
        name: req.body.name,
        price: req.body.price,
        barcode: req.body.barcode
    });
    try {
        const newFood = await food.save();
        res.status(201).json(newFood);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;