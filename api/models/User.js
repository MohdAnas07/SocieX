const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    userProfile: {
        type: String,
        default: ""
    },
    coverProfile: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50,
        default: ""
    },
    gender: {
        type: String,
        default: "-"
    },
    city: {
        type: String,
        max: 50,
        default: "-"
    },
    from: {
        type: String,
        max: 50,
        default: "-"
    },
    birthday: {
        type: String,
        default: "-"
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
        default: "-"
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("users", userSchema);