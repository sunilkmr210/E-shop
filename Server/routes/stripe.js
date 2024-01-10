const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

// router.post("/payment", (req, res)=>{
//     stripe.paymentIntents.create({
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: "usd",
//     },
//     (stripeErr, stripeRes)=>{
//        if(stripeErr){
//             res.status(501).json(stripeErr);
//         }else{
//             res.status(200).json(stripeRes);
//         }
//     })
// });

router.post("/payment", async (req, res) => {
    try {
        // Create a Payment Method using the token
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: req.body.tokenId,
            },
        });

        // Create a Payment Intent using the Payment Method
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            amount: req.body.amount,
            currency: "usd",
        });

        // If the payment intent is successful, return a success response
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        // If there's an error creating the Payment Intent, return an error response
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
