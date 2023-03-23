
const router = require('express').Router();
const Cart = require('../models/Cart');
const {verifyToken, verifyTokenAndAutorization, verifyTokenAndAdmin} = require('./veryfyToken');

//CREATE
router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    const newCart = new Cart(req.body);

	try{
        const saveCart = await newCart.save();
        res.status(200).json(saveProduct)
	}
	catch(err){
		res.status(500).json(err+'Error Desconocido')
	}
})


//UPDATE
router.put("/:id", verifyTokenAndAutorization, async (req, res) => {

	try{
		const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
			$set: req.body
		    },{new:true}
		);
        res.status(200).json(updateCart) 
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


//GET Cart
router.get("/find/:userId", verifyTokenAndAutorization, async (req, res) => {
	try{
      const cart = await Cart.find({userId: req.params.userId});
      res.status(200).json(cart);
	}
	catch (err) {
		res.status(500).json(err+'  error no identificated');
	}
})


//GET ALL 
router.get("/", async (req, res) => {
	try{
	  const carts = await Cart.find();
      res.status(200).json(carts);
	}
	catch (err) {
		res.status(500).json(err+'  error no identificated');
	}
})



module.exports = router