const Brand = require('../models/Brand')
const Product = require('../models/Product')

const brandController = {
    getBrand: async(req, res) =>{
        try {
            const brand = await Brand.find()
            res.json(brand)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBrand: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {name,email,contact} = req.body;
            const brand = await Brand.findOne({name})
            if(brand) return res.status(400).json({msg: "This brand already exists."})

            const newBrand = new Brand({name,email,contact})

            await newBrand.save()
            res.json({msg: "Brand created"})
        } catch (err) {console.log(err)
            return res.status(500).json({msg: err.message})
                
        }
    },
    deleteBrand: async(req, res) =>{
        try {
            const product = await Product.findOne({brand: req.params.id})
            if(product) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })

            await Brand.findByIdAndDelete(req.params.id)
            res.json({msg: "Brand deleted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBrand: async(req, res) =>{
        try {
            const {name, email, contact} = req.body;
            await Brand.findOneAndUpdate({_id: req.params.id},{ name, email, contact})

            res.json({msg: "Brand updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = brandController