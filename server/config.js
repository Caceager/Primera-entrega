const dotenv = require('dotenv');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'local'
dotenv.config({
    path: path.resolve(__dirname, NODE_ENV + '.env')
});
module.exports = {
    NODE_ENV,
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8081
}
