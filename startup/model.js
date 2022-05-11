'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../config/v1/mysql');


 const UserModel = require('../resources/v1/users/user.model')
 const ApiTokenModel = require('../resources/v1/apiTokens/apiToken.model')

const models = {
    
     User: UserModel.init(sequelize, Sequelize),
     ApiToken: ApiTokenModel.init(sequelize, Sequelize),
}

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

const db = {
    models,
    sequelize,
}

module.exports = db;