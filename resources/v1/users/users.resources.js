'use strict';
// const DataHelper = require('../../helpers/v1/data.helpers');

// const _DataHelper = new DataHelper();

const User = require('./user.model');

module.exports = class UsersResource {

    async createOne(data = null) {

        console.log('UsersResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }

        let user = await User.create(data);

        if (!user) {
            return false;
        }

        return user;
    }
    async getByEmail(email) {
        console.log('UsersResource@getByEmail');
        let results;

        try {
            results = await User.findOne({
                where: {
                    email: email,
                },
                raw: true,
            });
        } catch (err) {
            console.log(err)
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        if (!results) {
            return false;
        }

        return results;
    }
    async deleteOne(user_id) {
        console.log('User Resources@deleteOne');
        try {
            await User.destroy({
                where: {
                    id: user_id,
                }
            });
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        return true;
    }
    async getOne(id){
        console.log("UsersResource@getOne")
        if (!id || id === '') {
            throw new Error('id is required');
        }

        let user = User.findOne({
            where: {
                id: id
            }
        })

        if(!user){
            return false;
        }

        return user;
    }
}