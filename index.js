
const express = require("express");
const mongoose = require('mongoose');
const dontenv = require('dotenv')
const useRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const ordersRoute = require('./routes/order');
const authRoute = require('./routes/auth');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');

dontenv.config();

mongoose.connect(process.env.MONGO_URL)
	.then(()=>console.log('DB conection SucessFull!'))
	.catch((error)=>{console.log(error + ' error en mongodb');});

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', useRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/orders',ordersRoute);
app.use('/api/checkout',stripeRoute);



app.listen(process.env.PORT || 5000, ()=>{
	console.log('Backend server is runing in port 3030')
})

