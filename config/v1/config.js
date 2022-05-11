require('dotenv').config();

// create a global CONFIG object that can be throughout the application
let CONFIG = {};

CONFIG.env = process.env.ENV || 'dev';
CONFIG.port = process.env.PORT || '3000';

CONFIG.unoapp_token = process.env.UNOAPP_TOKEN;

CONFIG.mysql_driver = process.env.MYSQL_DRIVER || 'mysql';
CONFIG.mysql_host = process.env.MYSQL_HOST || 'localhost';
CONFIG.mysql_port = process.env.MYSQL_PORT || '3306';
CONFIG.mysql_name = process.env.MYSQL_DB_NAME || 'default'
CONFIG.mysql_user = process.env.MYSQL_USER || 'root';
CONFIG.mysql_password = process.env.MYSQL_PASSWORD || '';

CONFIG.redis_url = process.env.REDIS_URL;
CONFIG.redis_port = process.env.REDIS_PORT;

CONFIG.api_ver = process.env.API_VER;

if (process.env.ENV === 'dev' || process.env.ENV === 'development') {
    CONFIG.cors_whitelist = ['http://localhost:3000' ];
} 
else {
    CONFIG.cors_whitelist = ['http://localhost:3000', 'http://localhost:3001']

    CONFIG.pn_publishKey = process.env.PUBNUB_PUBLISH;
    CONFIG.pn_subscribeKey = process.env.PUBNUB_SUBSCRIBE;
}

module.exports = CONFIG;