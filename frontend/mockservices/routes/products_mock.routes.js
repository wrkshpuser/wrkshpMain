const express = require('express')
const router = express.Router()
const helper = require('../helpers/helper.js')


/* 15 Posts */
router.get('/15', async (req, res) => {
    let productQueried = helper.getProductsByQuery('products','$.*');
    res.json(productQueried);
})

/* Search */
router.get('/search', async (req, res) => {
    let productQueried = helper.getProductsByQuery('products','$..[?(/'+req.query.productName+'/i.test(@.productName) )]');
    res.json(productQueried);
})

/* All posts */
router.get('/all', async (req, res) => {
    let productQueried = helper.getProductsByQuery('products','$.*');
    res.json(productQueried);
})

/* by prduct id */
router.get('/:productId', async (req, res) => {
    let productQueried = helper.getProductsByQuery('products','$..[?(@.productCode=="'+req.params.productId+'")]');
    res.json(productQueried[0]);
})

module.exports = router