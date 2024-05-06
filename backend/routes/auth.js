const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a user using POST "/api/auth/createUser". DOesn't require auth. No Login required
router.post('/createUser', [
    body('name', 'Password must be atleast 3 characters').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check if email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: "email already exists" });
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})
module.exports = router;