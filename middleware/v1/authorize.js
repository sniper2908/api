'use strict';
require('dotenv').config();
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const UsersResource = require('./../../resources/v1/users/users.resources')
const _User = new UsersResource()


module.exports = class AuthorizationMiddleware {

    
    async auth(req,res,next){
        console.log('AuthorizationMiddleware@auth');

        if (!req.headers['authorization']) {
            return response.unauthorized('missing api token', res, false);
        }

        let token = req.headers['authorization'];
        
        try{
            
            jwt.verify(token, process.env.JWT_TOKEN_KEY, async(err, decoded) => {
                if (err) {
                  return response.unauthorized(err.message,res,false)
                }

                req.user = await _User.getOne(decoded.user_id)

                if(req.user === null){
                    return response.unauthorized("invalid token", res, false);  
                }

                next()
            });
        }
        catch (error) {
            return response.unauthorized(error.message, res, false);
        }
        
    }
}