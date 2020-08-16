const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DBUSER, DBPASSWORD } = process.env;

const uri = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0-z8ae8.mongodb.net/test?retryWrites=true&w=majority;`;
// console.log(uri);
let db = null;
let client = null;

exports.init = async ()=> {
    if (!client) {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        try {
            await client.connect();
            console.log('client created');
            db = await client.db('test');
            return { client, db };
        } catch (e) {
            // console.log(e);
            return e;
        }
    } else {
        console.log('client already created');
        return { client, db };
    }
};

// exports.getClient = ()=>{
//     return client;
// };

// exports.getDb = ()=>{
//     return db;
// };
