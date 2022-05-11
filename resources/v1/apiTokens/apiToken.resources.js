'use strict';
require('dotenv').config();
const Op = require('sequelize').Op;
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();
const jwt = require('jsonwebtoken');
const ApiToken = require('./apiToken.model');
const UsersResource = require('../users/users.resources');
const _User = new UsersResource();

module.exports = class ApiTokenResource {
    
    async createOne(data = null) {
    
        console.log('ApiTokenResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        let apiToken = await ApiToken.create(data);

        if (!apiToken) {
            return false;
        }

        return apiToken;
    }
    
    async deleteOne(token = null) {
    
        console.log('ApiTokenResource@deleteOne');
        if (!token || token === '') {
            throw new Error('token is required');
        }

        let isDeleted = await ApiToken.destroy({
            where: {
                token: token
            }
        }
        );

        if (!isDeleted) {
            return false;
        }

        return isDeleted;
    }

}