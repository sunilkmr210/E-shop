// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const product = require('../models/product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const redis = require('redis');
const client = redis.createClient();


//add-product
router.post('/addProduct', verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(501).json(err);
    }
})

//update product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete product
router.delete('/:id', verifyTokenAndAdmin, async (req, res)=>{
    try{
        await product.findOneAndDelete(req.params.id);
        res.status(200).json("product has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//finding a particular product

router.get('/find/:id', async (req, res)=>{
    try{
        const productId = req.params.id;
        client.get(`product:${productId}`, async (err, cachedProduct)=>{
            if(err){
                res.send(500).send('Internal Server Error');
            }
            else if(cachedProduct){
                res.json(JSON.parse(cachedProduct));
            }else{
                const product1 = await product.findById(productId);

                client.setEx(`product:${productId}`, 3600, JSON.stringify(product));

                res.status(200).json(product1);                
            }
        })

    }catch(err){
        res.status(500).json(err)
    }
})

//get all products
router.get('/', async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    // console.log(qCategory);

    const pageNumber = parseInt(req.query.page);
    const pageSize = 2;
    const skip = (pageNumber-1)*pageSize;

    try{
        let products;
        if(qNew){
            products = await product.find().sort({createdAt: -1}).limit(5);
        }else if(qCategory){
            products = await product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }else{
            products = await product.find().skip(skip).limit(pageSize);
        }

        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err)
    }
});

//total number of products
router.get('/total', async (req, res)=>{
    try{
        const totalProducts = await product.countDocuments();
        res.status(200).json(totalProducts);
    }catch(err){
        res.status(501).json(err);
    }
});

//searching in products

router.get('/search', async (req, res)=>{
    try{
        const query = req.query.query;
        const matchedProducts = await product.find({$text: {$search: query}});
        res.status(200).json(matchedProducts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;