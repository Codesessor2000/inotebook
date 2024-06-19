const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser")
const JWT_SECRET = "Chaitanya$Learning$MERN"

//Create a user using POST "/api/auth/createUser". DOesn't require auth. No Login required
router.post('/createUser', [
    body('name', 'Password must be atleast 3 characters').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check if email exists already
        let user = await User.findOne({success, email: req.body.email });
        if (user) {
            return res.status(400).json({success, errors: "email already exists" });
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authToken});
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

//Authentication of a user using POST "/api/auth/login". DOesn't require auth. No Login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ success, errors: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            success=false;
            return res.status(400).json({ success,errors: "Please try to login with correct credentials" });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success=true;
        res.send({success, authToken})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

//Get LOggedin user details using POST: "api/auth/getUser". Login required
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        // if (!user) {
        //     return res.status(400).json({ errors: "Please try to login with correct credentials" });
        // }
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})


module.exports = router;