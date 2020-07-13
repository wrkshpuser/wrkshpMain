const express = require('express')
const router = express.Router()
router.use('/api/catalogue-rest/product', require('./products_mock.routes.js'))
router.use('/api/customer-rest/customer', require('./user_mock.routes.js'))
router.use('/api/payment/creditService', require('./payment_mock.routes.js'))
module.exports = router