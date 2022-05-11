const _ = require('lodash');
// const path = require('path');
// const fs = require('fs');
// const util = require('util');
// const config = require('config');
// const jwt = require('jsonwebtoken');
// const { StaticFiles } = config.get('appConstants');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const UsersResource = require('./users.resources');
const _User = new UsersResource();

const ApiTokenResource = require('../apiTokens/apiToken.resources');
const _ApiToken = new ApiTokenResource()
module.exports = class UsersController {

    async createOne(req, res) {
        console.log('UsersController@createOne=======');
        let data = _.pick(req.body, ['first_name', 'last_name', 'email', 'password'])
        
        let hashedPassword = await _DataHelper.hashPassword(data.password);
        data.password = hashedPassword;
         
        // let userToken = req.headers['authorization']
        // if(userToken){
        //     let userId = await _ApiToken.getUsertoken(userToken)
        //     data.created_by = userId ? userId.user_id : "";
        // }

        let user = await _User.createOne(data);
        if (!user) {
            return response.exception('Unable to create new user', res, false);
        }

        let token = await _DataHelper.generateToken({ user_id: user.id })

        await _ApiToken.createOne({
            token: token,
            user_id: user.id,
            is_active: 1
        })

        return response.created('user created successfully', res, {
            id: user.id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
            token: token,
            is_active: user.is_active,
        });
    }
   
  
  
    async logout(req, res) {
        console.log("UsersController@logout");
        let userDetails = req.user
        let token = req.headers['authorization']
        let isLoggedOut = await _ApiToken.deleteOne(token)

        if (isLoggedOut) {
            return response.success('logged out successfully', res, {})
        } else {
            return response.success('Already logged out', res, {})
        }

    }
  
 

    async operatorLogin(req, res) {
        console.log("UsersController@adminLogin",req);
        let userDetails = req.user
         
        let token = await _DataHelper.generateToken({ user_id: userDetails.id })

        await _ApiToken.createOne({
            token: token,
            user_id: userDetails.id,
            is_active: 1
        })
    
        return response.success('logged in successfully', res, {
            id: userDetails.id,
            is_active: userDetails.is_active,
            email: userDetails.email,
            firstname: userDetails.first_name,
            lastname: userDetails.last_name,
            token: token,
   
        })
    }
    async deleteOne(req, res) {
        console.log('UsersController@deleteOne');
        let userDelete = await _User.deleteOne(req.params.id);

         if(!userDelete) {
            return response.exception('error deleting User', res, false);
          } 
        return response.success('successfully deleted User', res, true);
    }

}   
