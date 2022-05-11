require('dotenv').config();
const ResponseHelper = require('./response.helpers');
const response = new ResponseHelper();
const axios = require('axios');
module.exports = class ApiServiceHelpers {

    async userDetailsApi(reqHeader){
        console.log('ApiServiceHelpers@userDetailsApi');

        if (!reqHeader) {
            return response.unauthorized('missing api token', false);
        }
        try{
            let authRes = await axios.get(process.env.AUTH_URL + '/api/v1/user', {
                headers : {
                  authorization : reqHeader 
                }
            });

            if(authRes.status == 200){
                return authRes.data
            }
        }
        catch (error) {
            return response.unauthorized(error.message, false);
        }
    }
}