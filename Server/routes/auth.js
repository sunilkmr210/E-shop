const router = require('express').Router();
const user = require('../models/user');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');



router.post('/register', async (req, res)=>{
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password, process.env.cry_sec).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res)=>{
    try{
        const user1 = await user.findOne({ username: req.body.username});
        // !user1 && res.status(401).json("Incorrect username");
        if(!user1){
            res.status(401).json("Incorrect username");
            return;
        }

        const hashedPassword = cryptoJs.AES.decrypt(
            user1.password,
            process.env.cry_sec
        );
        const password1 = hashedPassword.toString(cryptoJs.enc.Utf8);

        //originalPassword != inputPassword && res.status(401).json("Wrong Password");
        //above line of code causes app to crash on wrong password

        if(password1 !== req.body.password){
            res.status(401).json("Incorrect password");
            return;
        }
        const accessToken = jwt.sign(
        {
            id: user1._id, 
            isAdmin: user1.isAdmin,
        },
        process.env.jwt_sec,
        {expiresIn:"3d"}
        );

        const {password, ...others} = user1._doc;    
        res.status(200).json({...others, accessToken});
        
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;