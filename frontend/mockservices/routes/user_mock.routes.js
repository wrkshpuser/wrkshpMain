const express = require('express')
const router = express.Router()
const helper = require('../helpers/helper.js')
const failureMock = require('../data/customerloginfailure.json')
const customer = require('../data/customer.json')

/* 15 Posts */
router.post('/login', async (req, res) => {
    let email =  req.body.email;
    let password = req.body.password;

    let productQueried = helper.getProductsByQuery('customer','$..[?(@.email=="'+email+'" && @.password=="'+password+'")]');
  console.log(productQueried)
    if(productQueried.length>0){
        res.json(productQueried[0]);
    }else{
        failureMock.message = "Customer not found with email "+email;
        res.status('404').json(failureMock);
    }
    
})

router.post('/registration', async (req, res) => {
    let email =  req.body.registeremail;
    let password = req.body.password;
    let confirmPassword = req.body.confirmpassword;
    let firstName =  req.body.firstname;
    let lastName = req.body.lastname;

    if(req.body.firstname ===  undefined || req.body.lastname  ===  undefined  || req.body.password  ===  undefined || req.body.confirmpassword   ===  undefined || req.body.registeremail   ===  undefined){
        failureMock.message = "All Fields are Mandatory";
            res.status('404').json(failureMock);
    }else if(password == confirmPassword){
        let emailCheck = helper.getProductsByQuery('customer','$..[?(@.email=="'+email+'")]');
        if(emailCheck.length>0){
            failureMock.message = "This Email "+email+" is already Registered";
            res.status('404').json(failureMock);
        }else{
            let newPost = {"id": customer.length+1,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password};
            customer.push(newPost)
            helper.writeJSONFile('./mockservices/data/customer.json', customer)
            emailCheck = helper.getProductsByQuery('customer','$..[?(@.email=="'+email+'")]');
            res.json(emailCheck[0]);
        }
    }else{
        failureMock.message = "This Password and Confirm Password donot match";
        res.status('404').json(failureMock);
    }
       
    
})



module.exports = router