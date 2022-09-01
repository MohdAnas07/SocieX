const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


// UPDATE USER======================================================>>
router.put('/:id', async (req, res) => {
    // for checking update only their account credentials 
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        // if password going to update then we have to encrypt that first
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                res.status(500).json(error)
            }
        }

        // here we updating whole user body
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json("account has been updated")

        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("you can update only your account")

    }
})


// DELETE USER======================================================>>
router.delete('/:id', async (req, res) => {
    // for checking update only their account credentials 
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // here we deleting user 
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("account has been deleted Successfully")

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can delete only your account")
    }
})


// GET A USER============================================================>> 
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;

        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FOLLOW A USER======================================================>>
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json('you followed this user')
            } else {
                res.status(403).json("you already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("you can't follow yourself");
    }
})

// FOLLOWING A USER======================================================>>
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json('you unfollowed this user')
            } else {
                res.status(403).json("you don't follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("you can't unfollow yourself");
    }
})


module.exports = router;