// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const product = require('../models/product');
const {verifyTokenAndAdmin } = require('./verifyToken')
// const redis = require('redis');
// const Redis = require('ioredis');
// const url = `https://redis/${167.71.228.51/${6379}}`
// const client = redis.createClient({
//     host: '167.71.228.51'   
//});
// client.connect();
// const redis = new Redis({
//     host: '127.0.0.1',
//     port: 5000,
// });


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
        const product1 = await product.findById(productId);
        res.status(200).json(product1);

        // router.get('/find/:id', async (req, res) => {
        //     try {
        //       const productId = req.params.id;
        //       const cachedProduct = await client.get(`product:${productId}`);
              
        //       if (cachedProduct) {
        //         res.json(JSON.parse(cachedProduct));
        //       } else {
        //         const product1 = await product.findById(productId);
        //         await client.set(`product:${productId}`, JSON.stringify(product1), 'EX', 3600);
          
        //         res.status(200).json(product1);
        //       }
        //     } catch (err) {
        //       console.error('Error:', err);
        //       res.status(500).send('Internal Server Error');
        //     }
        //   });


        // client.get(`product:${productId}`, async (err, cachedProduct)=>{
        //     if(err){
        //         res.status(500).send('Internal Server Error');
        //     }
        //     else if(cachedProduct){
        //         res.json(JSON.parse(cachedProduct));
        //     }else{
        //         const product1 = await product.findById(productId);

        //         client.setEx(`product:${productId}`, 3600, JSON.stringify(product1));

        //         res.status(200).json(product1);                
        //     }
        // })

        // another method using ioredis
        // const cachedProduct = await redis.get(`product:${productId}`);
        // if(cachedProduct){
        //     console.log('Product details found in cache');
        //     res.status(200).json(JSON.parse(cachedProduct));
        // }
        // const product1 = await product.findById(productId);
        // await redis.set(`product:${productId}`, JSON.stringify(product1), 'EX', 3600);
        // console.log('Product details cached in Redis');
        // res.status(200).json(product1);
    }catch(err){
        res.status(500).json(err)
    }
})

//get all products
router.get('/', async (req, res)=>{
    const qNew = req.query.new;
    const qCategory1 = req.query.category;
    const qCategory = qCategory1=="undefined"?null:req.query.category;
    const qFilter = req.query.filters;
    const qFilters = qFilter&&qFilter!="undefined" ? JSON.parse(qFilter) : null;
    const qSort1 = req.query.sort;
    const qSort = qSort1=="undefined"?null:req.query.sort;
    // console.log(qCategory);

    const pageNumber = parseInt(req.query.page);
    
    const pageSize = 2;
    const skip = (pageNumber-1)*pageSize;

    try{
        let products;
        if(qNew){
            products =  product.find().sort({createdAt: -1});
        }else if(qCategory){
            console.log(qCategory);
            products =  product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }
        else{
            products = product.find();
        }
        if(qFilters){
            // const filterCriteria = [];
            // console.log("hello");
            // console.log(qFilters);
            const filterCriteria = Object.keys(qFilters).map(key=>({
                [key]: qFilters[key]
            }));
            // console.log("hello");
            // console.log(filterCriteria);
            const mongoQuery = filterCriteria.length>0?{$and: filterCriteria}:{};
            products = products.find(mongoQuery);


            // products = products.filter(item =>
            //     Object.entries(qFilters).every(([key, value]) =>
            //       item[key].includes(value)
            //     )
            //   )
        }

        if(qSort){
            // console.log(qSort);
            if (qSort == "newest") {
                  products = products.sort({createdAt: -1})
                
              }
              else if (qSort == "asc") {
                  products = products.sort({price: 1})
                }
                else {
                //   console.log("hello");
                products = products.sort({price: -1})
              }
        }
        // const total = await products.count();
        //you have to use facet of aggregate pipeline for total and 
        //product togehter from server side
        const total = 5;
        products =  products.skip(skip).limit(pageSize);
        const product1 = await products.exec();

        res.status(200).json({product1, total});
    }catch(err){
        res.status(500).json(err)
    }
});


//searching in products

router.get('/search', async (req, res)=>{
    try{
        const query3 = req.query.query2;
        // console.log(query3);
        const matchedProducts = await product.find({$text: {$search: query3}});
        res.status(200).json(matchedProducts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;