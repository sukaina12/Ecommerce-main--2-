const Order = require('../models/Order')
const User = require('../models/User')
const Products = require('../models/Product')


const orderController = {
    getOrder: async(req, res) =>{
        try {
            const order = await Order.find()
            res.json(order)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    placeOrder: async(req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, address, total, fname, lname ,email, contact} = req.body;
            console.log(user)
            const {_id} = user;

            const newOrder = new Order({
                user_id: _id, fname, lname, email, cartItems: cart, address,contact, total
            })

            
            cart.filter(item => {
                console.log(item.quantity)
                return sold(item._id, item.quantity, item.sold)
            })
            

            cart.filter(item => {
                
                return quantityf(item._id, item.quantity, item.stock)
            })
            
            await newOrder.save()
            res.json({msg: "Payment Succes!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

const quantityf = async (id, quantity, oldStock) =>{
    await Products.findOneAndUpdate({_id: id}, {
        stock: oldStock - quantity
    })
}

module.exports = orderController