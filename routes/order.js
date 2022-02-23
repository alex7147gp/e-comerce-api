
const router = require('express').Router();
const Order = require('../models/Order');
const {verifyToken, verifyTokenAndAutorization, verifyTokenAndAdmin} = require('./veryfyToken');

//CREATE
router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    const newOrder = new Order(req.body);

	try{
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder)
	}
	catch(err){
		res.status(500).json(err+' Error Desconocido line 15')
	}
})


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

	try{
		const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
			$set: req.body
		    },{new:true}
		);
        res.status(200).json(updateOrder) 
	} catch (err) {
		res.status(500).json(err+'  error no identificated')
	}
})


//DELETE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try{
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json('Product has been delete...')
	}
	catch(err){
	  res.status(500).json(err+'  error no identificated');
	}
})


//GET ORDER
router.get("/find/:userId", verifyTokenAndAutorization, async (req, res) => {
	try{
      const orders = await Order.find({userId: req.params.userId});
      res.status(200).json(orders);
	}
	catch (err) {
		res.status(500).json(err+'  error no identificated');
	}
})


//GET ALL 
router.get("/",verifyTokenAndAdmin, async (req, res) => {
	try{
	  const carts = await Order.find();
      res.status(200).json(carts);
	}
	catch (err) {
		res.status(500).json(err+'  error no identificated line 66');
	}
})

//GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async(req, res)=>{
	const productId = req.query.pid;
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
	try{
	  const income = await Order.aggregate([
	  { $match: { createdAt: { $gte: previousMonth}, ...(productId && {
	  	  products : {$elemMatch: {productId} }, 
	      }) 
	     } 
	  },
	  {
	  	$project: { 
	  		month: { $month: "$createdAt" },
	  		sales: "$amount",  
	  	}}, 
        { 
        	$group:{
        		_id:"$month",
        		total: {$sum: "$sales"},
        	},
        }
	  ])	  
       res.status(200).json(income)
	}
	catch(err){
		res.status(500).json(err+' error no identificated')
	}
})

module.exports = router