const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: {type: Array},
        // products: [
        //     {
        //         productId: {
        //             type: String,
        //         },
        //         quantity: {
        //             type: Number,
        //             default: 1,
        //         },
        //     },
        // ],
        quantity: {type: Number},
        total: {type: Number}
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('cart', cartSchema);