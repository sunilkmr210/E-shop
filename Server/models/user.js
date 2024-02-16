const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        name: {type: String},
        mobile: {type: Number, unique: true},
        wishlist: {type: Array}
    },
    { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);