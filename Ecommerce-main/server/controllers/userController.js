const config = require('../index.js');
//var sequelize = require('sequelize');
//var DataTypes = require("sequelize").DataTypes;
const User = require('../models/User');
const Order = require('../models/Order');
//const db = require('../models/index.js')
//const User = db.User;
const connection= config.connection

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req,res) => {
            var flag=0;

            try {
                const {fname, lname, email, contact, password} = req.body;
    
                const user = await User.findOne({email})
                if(user) return res.status(400).json({msg: "The email already exists."})
    
                if(password.length < 8) 
                    return res.status(400).json({msg: "Password must be atleast 8 characters long."})
    
                const passwordHash = await bcrypt.hash(password, 10)
                const newUser = new User({
                    fname, lname, email, contact, password: passwordHash
                })
    
                await newUser.save()

                const access_token = createAccessToken({id: newUser._id});
                const refreshtoken = createRefreshToken({id: newUser._id});

                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly: true,
                    path:'/user/refresh_token',
                    maxAge: 7*24*60*60*1000


                })
                return res.json({access_token})

                //return res.status(200).json({msg:"Registered Successfully"})
    
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }

            
        
        },  
        
    login : async (req,res) => {
        try{
        const {email, password} = req.body;

        const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const passMatch = await bcrypt.compare(password, user.password)
            if(!passMatch) return res.status(400).json({msg: "Incorrect password."})

            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000
            })

            res.json({accesstoken})

            //else return res.status(200).json({msg:"Logged in successfully"})
     }


            catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },

    logout: async (req,res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.status(200).json({msg:"Logged Out"})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: (req,res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({user,accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserInfo: async (req, res) =>{
        try {
            const user = await User.findById(req.user.id)
            
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    addToCart: async (req, res) =>{
        try {
            const user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await User.findOneAndUpdate({_id: req.user.id}, {
                cartItems: req.body.cart
            })

            return res.json({msg: "Product added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    orderHistory: async(req, res) =>{
        try {
            const history = await Order.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

};
    
const createAccessToken = (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
    }

const createRefreshToken = (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
    }

module.exports = userController