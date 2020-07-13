// Import packages
const express = require('express')
const morgan = require('morgan')
// App
const app = express()


var cors = require('cors');
app.use(cors());
/* your regular routes go here */
// Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('mockservices/public'));
//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/img'));
app.use(require('./mockservices/routes/index.routes'))

  
// Starting server
app.listen('8081')