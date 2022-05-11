const express = require('express');
const app = express();

let server;


require('./startup')(app);
require('./startup/model')

if(process.env.SSL_STATUS === 'true'){
    const fs = require('fs');
    let key = fs.readFileSync(process.env.SSL_KEY_PEM_PATH, 'utf8').toString();
    let cert = fs.readFileSync(process.env.SSL_CERT_PEM_PATH, 'utf8').toString();

    console.log("Key :",key)
    console.log("Cert :",cert)
    
    const options = {
        key: key,
        cert: cert
    };
    server = require('https').createServer(options,app);
}else{
    server = require('http').Server(app);
}

server.listen(process.env.PORT, async () => {
    const error = require('./middleware/v1/error');

    // services
    // await require('./services/v1/cache');

    // routes
    await require('./startup/routes')(app);

    app.use(error);
    console.log('listening on port: ', process.env.PORT);
});