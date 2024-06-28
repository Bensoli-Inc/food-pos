const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../models/User');
require('dotenv').config();

//register a new User
router.post('/register', async (req,res) => {
    const{username, password} = req.body
    
    try {
        //check if user already exists
        let user = await User.findOne({username});
        if (user) {
            return res.status(400).json({message: 'Username already taken'});
        }
        //create new user
        user = new User({
            username,
            password
        });
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        //save user to db
        await user.save();

        //generate jwb token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error' });
    }
});

module.exports = router;