const express = require('express');
const routes = express.Router();


const UsersValidation = require('./users.validations');
const validate = new UsersValidation();

const UsersController = require('./users.controller.js');
const user = new UsersController();

/**
 * routes
 */

routes.post('/create', user.createOne);
routes.post('/operator/login',  [validate.operatorLogin], user.operatorLogin);
routes.delete('/:id', [validate.deleteOne], user.deleteOne);



module.exports = routes;