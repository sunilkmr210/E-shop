// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const order = require('../models/order');
const product = require('../models/product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

//Creating an order
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Updating an order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleting an order
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await order.findOneAndDelete(req.params.id);
        res.status(200).json("order has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//get user orders

router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all 

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    };
});


//get monthly income

router.get('income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()))
    try {
        const income = await order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { eleMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;