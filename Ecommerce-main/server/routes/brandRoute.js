const router = require('express').Router()
const brandController = require('../controllers/brandController')
const authentication = require('../middleware/authentication')


router.route('/brand')
    .get(brandController.getBrand)
    .post(authentication, brandController.createBrand)

router.route('/brand/:id')
    .delete(authentication,brandController.deleteBrand)
    .put(authentication, brandController.updateBrand)

module.exports = router