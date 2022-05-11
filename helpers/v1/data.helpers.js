const _ = require('lodash');
const hash = require('object-hash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../../resources/v1/users/user.model');

module.exports = class DataHelper {
    
    
    async generateHash(value) {
        console.log('DataHelper@generateHash');
        // generate a token
        let hashedValue = hash.sha1({
            value: value,
            random: new Date(),
        });

        return hashedValue;
    }
    
    async generateToken(data){
        console.log("DataHelper@generateToken");
        let token = jwt.sign(data, process.env.JWT_TOKEN_KEY,{expiresIn: "24h"});
        if(!token){
            return false
        }
        return token
    }
    async hashPassword(password) {
        console.log('DataHelper@hashPassword');
        let hashedPassword = await bcrypt.hash(password, 10);

        if (!hashedPassword) {
            throw new Error('error generating password hash');
        }

        return hashedPassword;
    }

    async validatePassword(passwordString, passwordHash){
        console.log("DataHelper@validatePassword")
        let isPasswordValid = await bcrypt.compare(passwordString,passwordHash)

        if(!isPasswordValid){
            return false
        }

        return true
    }

    

    
}