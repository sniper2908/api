const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const UsersResource = require('./users.resources');
const _User = new UsersResource();
 
module.exports = class UsersValidation {

    async createOne(req, res, next) {
        console.log('UsersValidation@createOne',req.body);
        
        
        let schema = {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
           
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if (errors) {
            return response.badRequest('invalid request data', res, errors);
        }


        // check if the passwords match
        if (req.body.password !== req.body.confirm_password) {
            return response.badRequest('passwords do not match', res, false);
        }

        // make sure password meets minimum requirements
        let passwordCheck = await _DataHelper.passwordRegex(req.body.password);

        if (!passwordCheck) {
            return response.badRequest('insecure password. password must be at least 8 characters long, with 1 capital letter, 1 number and 1 special character', res, false);
        }

        //check if a user with that email already exists
        let user = await _User.getByEmail(req.body.email);

        if (user) {
            return response.conflict('an user with this email already exists', res, false);
        };
        
        next();
    }
    async operatorLogin(req, res, next) {
        console.log("UsersValidation@adminLogin");

        let schema = {
            email: Joi.string().required(),
            password: Joi.string().required()
        }

        // Check this email address exists in our records
        let user = await _User.getByEmail(req.body.email)
        console.log("user login details",user)
        if (!user) {
            return response.notFound('invalid email address', res, false);
        }

        // check valid password match for req user
        let isPasswordValid = await _DataHelper.validatePassword(req.body.password, user.password)

        if (!isPasswordValid) {
            return response.conflict("password not matched", res, false)
        }

        req.user = user
        next()
    }
    async deleteOne(req, res, next) {
        console.log('User Validation@deleteOne');
        if(!req.params.id || !req.params.id === ''){
            return response.badRequest('user id is required', res, false);
        }

        // make sure the user exists
        let user = await _User.getOne(req.params.id);

        if (!user) {
            return response.notFound('user not found', res, false);
        };
        
        next();
    }

}    