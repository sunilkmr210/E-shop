// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const cart = require('../models/cart');
const product = require('../models/product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyToken, async (req, res)=>{
    const newCart = new cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedCaart);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await cart.findOneAndDelete(req.params.id);
        res.status(200).json("cart has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//finding a particular product

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const cart1 = await cart.findOne({userId: req.params.userId});
        res.status(200).json(cart1);
    }catch(err){
        res.status(500).json(err)
    }
})

//get all 

router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try{
        const carts = await cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;