const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');



// custom req
const CONFIG = require('../config/v1/config');

module.exports = function (app) {
    console.log('loading startup files');
    app.use(helmet());


    // dev environment configurations
    if (CONFIG.env === 'dev' || CONFIG.env === 'development') {
        app.use(morgan('tiny'));

        // console.log('approved domains for development: ', CONFIG.cors_whitelist);
        console.log('development mode active....');
    }

    app.use(cors({ 
        origin: 'http://localhost:3000', 
        preflightContinue: true, 
        credentials: true,
        allowedHeaders: "*",
        
     }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
   
}