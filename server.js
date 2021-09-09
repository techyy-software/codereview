const express = require("express")
const router = require('./routes/api');
const handleErrors = require('./errors');

function createServer() {
    const app = express()
    app.use(express.json());
    app.use('/api', router);
    // error handling middleware
    app.use(handleErrors);
    
    return app
}

module.exports = createServer