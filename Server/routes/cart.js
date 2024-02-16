// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const cart = require('../models/cart');
const product = require('../models/product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

// creating a cart
router.post('/', verifyToken, async (req, res) => {
    const newCart = new cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})


//updating a cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await cart.findOneAndUpdate(
            {userId: req.params.id},
            {$set: req.body},
            { new: true, upsert:true }
        );
        res.status(200).json(updatedCart);

        //upsert true reduces this code
        // if (updatedCart) {
        //     res.status(200).json(updatedCart);
        // }
        // else {//if updated cart not there create cart or you can call create cart api on client side
        //     const newCart = new cart(req.body);
        //     const savedCart = await newCart.save();
        //     res.status(200).json(savedCart);
        // }

    } catch (err) {
        res.status(500).json(err);
    }
});

//deleting a cart
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await cart.findOneAndDelete(req.params.id);
        res.status(200).json("cart has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//finding a particular cart

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart1 = await cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart1);
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all 

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;