//const {Product} = require('../models')
const config = require('../index.js');
const connection= config.connection
const Product = require('../models/Product');
//const express = require('express');
//const multer = require('multer')
//const ejs = require('ejs')
//const path = require('path')
 

class features {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
        console.log(queryObj)
       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       console.log(queryObj)
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

       console.log(queryStr)
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }   
       sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

     paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 15
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
        } 
    }

const productController = {
    getProduct: async(req,res) => {
        try {
            const result = new features(Product.find(), req.query).filtering().sorting().paginating()
            
            console.log(result)

            const products = await result.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    addProduct: async(req, res) =>{
        try {
            const {SKU, name, price, description, brand, image, stock, category} = req.body;
            //const image = req.file.path;
            if(!image) return res.status(400).json({msg: "No image upload"})

            const product = await Product.findOne({SKU})
            if(product)
                return res.status(400).json({msg: "This product already exists."})

            const newProduct = new Product({SKU, name, price, description,category, brand, image, stock})

            await newProduct.save()
            
            return res.status(200).json({msg: "Product Added"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteProduct: async(req, res) =>{
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({msg: "Product deleted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const {SKU, name, price, description, brand, image, stock, category} = req.body;
            if(!image) return res.status(400).json({msg: "No image uploaded"})

            await Product.findOneAndUpdate({_id: req.params.id}, {
                name, price, description, brand, image, stock, category
            })

            res.json({msg: "Product uploaded"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = productController