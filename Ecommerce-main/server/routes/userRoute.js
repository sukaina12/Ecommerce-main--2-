const router = require('express').Router()
//const bodyParser = require('body-parser')
const userController = require('../controllers/userController')
const authentication = require('../middleware/authentication')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.get('/refresh_token', userController.refreshToken)

router.get('/user_info', authentication,  userController.getUserInfo)

router.patch('/add_to_cart', authentication, userController.addToCart)

router.get('/order_history', authentication, userController.orderHistory)


module.exports = router