var config = {};

config.default = {};
config.db = {};
config.app_read = {};
config.aws = {};

config.default.name = 'SERVER_NAME';
config.default.env = process.env.NODE_ENV || 'development';
config.default.host = process.env.NODE_HOST || '127.0.0.1';
config.default.port = process.env.NODE_PORT || '3000';

config.db.host = process.env.NODE_DB_HOST || '192.168.33.10';
config.db.user = process.env.NODE_DB_USER || 'root';
config.db.pass = process.env.NODE_DB_PASS || 'root';
config.db.port = process.env.NODE_DB_PORT || '27017';
config.db.name = process.env.NODE_DB_NAME || 'restify';

config.aws.bucket = 'isogram';

config.aws.config = {
    accessKeyId: process.env.ACCESS_KEY_ID || "AKIAIIC6W2B3KHCGF6KA",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "NVhD43EhJZ6vD/ESApAI9VJ5cL73FtuBibBBuuCX",
    region: process.env.REGION || "ap-southeast-1"
};

config.app_read.token = 'YOUR_TOKEN';

module.exports = config;