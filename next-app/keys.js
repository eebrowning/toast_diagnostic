require('dotenv').config();
const clientId= process.env.CLIENT_ID;
const clientSecret= process.env.CLIENT_SECRET;
const guid= process.env.GUID;

module.exports=[clientId, clientSecret, guid]

