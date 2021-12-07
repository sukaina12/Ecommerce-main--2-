const router = require('express').Router()
const orderController = require('../controllers/orderController')
const authentication = require('../middleware/authentication')
//const authAdmin = require('../middleware/authAdmin')


router.route('/order')
    .get(authentication, orderController.getOrder)
    .post(authentication, orderController.placeOrder)


module.exports = router