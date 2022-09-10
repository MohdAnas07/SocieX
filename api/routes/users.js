const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { route } = require('./posts');


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
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const username = req.query.username;

        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });

        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }
})


// GET ALL USERS ============================
router.get('/all', async (req, res) => {
    try {
        const allUser = await User.find({})
        if (allUser) {
            res.status(200).json(allUser)
        } else {
            res.json('no user found')
        }
    } catch (error) {
        res.status(500).json('something went wrong')
    }
})


// GET USER FRIENDS =========================
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = []
        friends.map(friend => {
            const { _id, username, userProfile } = friend;
            friendList.push({ _id, username, userProfile });
        });
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
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