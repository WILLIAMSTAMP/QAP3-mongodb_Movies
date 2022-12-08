const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Wes88:Seedweed296@cluster0.rlcfvg7.mongodb.net/?retryWrites=true&w=majority";
const pool = new MongoClient(uri);

module.exports = pool;