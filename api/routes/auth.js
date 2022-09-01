const router = require('express').Router();
const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();



app.use(express.json());

router.get('/', (req, res) => {
    res.send('hello, this is auth route');
})


//REGISTER 
router.post('/register', async (req, res) => {

    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        // save user and response
        const user = await newUser.save()
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }

})

// LOGIN 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).send("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).send("wrong password")

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;