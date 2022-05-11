require('dotenv').config();
module.exports = class ResponseHelper {
    async success(msg, res, payload) {
        this.sendResponse(200, msg, res, payload);
    };

    async created(msg, res, payload) {
        this.sendResponse(201, msg, res, payload);
    };

    async noContent(msg, res, payload) {
        this.sendResponse(204, msg, res, payload);
    };

    async redirect(url, res) {
        return res.status(200).send({
            api_ver: process.env.API_VER,
            redirect_to: url,
        });
    };

    async badRequest(msg, res, payload) {
        this.sendResponse(400, msg, res, payload);
    };

    async unauthorized(msg, res, payload) {
        this.sendResponse(401, msg, res, payload);
    };

    async forbidden(msg, res, payload) {
        this.sendResponse(403, msg, res, payload);
    };

    async notFound(msg, res, payload) {
        this.sendResponse(404, msg, res, payload);
    };

    async exception(msg, res, payload) {
        this.sendResponse(500, msg, res, payload);
    };

    async conflict(msg, res, payload) {
        this.sendResponse(409, msg, res, payload);
    };

    async custom(code, msg, res, payload) {
        this.sendResponse(code, msg, res, payload);
    }

    async twoFactorEnabled(res) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return res.status(200).send({
            api_ver: process.env.API_VER,
            msg: 'TwoFactor authentication has been enabled for your account. We have sent you an access code to the phone associated to your account. Please verify the code to proceed',
            two_factor: true
        });
    };

    async sendResponse(code, msg, res, payload) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (!payload) {
            return res.status(code).send({
                api_ver: process.env.API_VER,
                msg: msg,
            });
        } else {
            return res.status(code).send({
                api_ver: process.env.API_VER,
                msg: msg,
                payload: payload,
            });
        }
    }
}