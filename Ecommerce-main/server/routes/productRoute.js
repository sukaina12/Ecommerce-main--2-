const router = require('express').Router()
const productController = require('../controllers/productController')

router.route('/products')
    .get(productController.getProduct)
    .post(productController.addProduct)

router.route('/products/:id')
    .delete(productController.deleteProduct)
    .put(productController.updateProduct)

module.exports = router