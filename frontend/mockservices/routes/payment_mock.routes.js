const express = require('express')
const router = express.Router()
const helper = require('../helpers/helper.js')
const paymentResp = require('../data/paymentResonse.json')


/* 15 Posts */
router.post('/creditCardTransactions', async (req, res) => {
 // paymentResp.id = Math.floor(100000000 + Math.random() * 900000000);
 console.log(req.body.credit_card)
 let productQueried = helper.getProductsByQuery('payment','$..[?(@.cardNumber=="'+req.body.credit_card.cardNumber+'" && @.cvv=="'+req.body.credit_card.cvv+'" && @.expiration_month=="'+req.body.credit_card.expiration_month+'" && @.expiration_year=="'+req.body.credit_card.expiration_year+'")]');
if(productQueried.length>0){
    res.status('200').json(paymentResp);
}else{
  paymentResp.id = "";
  paymentResp.additionalProperties.result = "Transaction Failed";
  paymentResp.status = "NOT OK";
  res.status('406').json(paymentResp);
}
})

module.exports = router