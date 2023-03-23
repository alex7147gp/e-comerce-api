const router = require('express').Router();

const Stripe = require('stripe');

const stripe = Stripe("sk_test_51KK8CTD9oGMKlIj9B88b3rZ98c2tkUhcSqw1Y9kC9QqTgovg5PnhBHCQ9VJ89xSN1T3QDegjZf0hQfgIJi19oUI100reMYPXlx");

router.post('/payment', (req, res)=>{
	console.log(stripe+'  '+stripe.charge +' '+ stripe.create)
	stripe.charges.create({
		source: req.body.tokenId,
		amount: req.body.amount,
		currency: "usd",
	}, (stripeErr, stripRes)=>{
        if(stripeErr){
           res.status(500).json(stripeErr+' Error not Indentificated')
        }
        else{
           res.status(200).json(stripRes)	
        }
	})
})





module.exports = router;



