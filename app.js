const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { init } = require('dbase');
require('dotenv').config();

const { PORT } = process.env;
const port = PORT || 5505;
const allowed_origins = [
    'http://localhost', 
    'https://localhost', 
    'https://qubitcreative.com.ng', 
    'http://qubitcreative.com.ng'
];

const index = require('./routes/index');
const verify = require('./routes/verify');

const app = express();
app.use(cookieSession({
    name: 'session',
    keys: ['apples', 'oranges'],
    maxAge: 600000,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ACA = 'Access-Control-Allow';
const REMOTE_PORT = process.env.REMOTE_PORT;
const REMOTE_SITE = process.env.REMOTE_SITE;

app.use((req, res, next)=>{
    if (allowed_origins.includes(req.headers.origin)){
        console.log('origin has access');
        res.set(`${ACA}-Origin`, `${req.headers.origin}:${REMOTE_PORT}`);
        res.set(`${ACA}-Headers`, 'content-type, authorization');
        res.set(`${ACA}-Methods`, 'POST, GET, OPTIONS');
        res.set(`${ACA}-Credentials`, 'true');
    }
    next();
});

app.use('/', index);
app.use('/verify', verify);

init().then(result => {
    if (result.db && result.client) {
        const server = app.listen(port, () => console.log(`Backend is listening on port ${PORT}`));
        return { db: result.db, client: result.client, server };
    }
    throw result;
}).then(result => {
    process.on('SIGINT', async () => {
        try {
            console.log('SIGINT RECEIVED');
            result.server.close();
            console.log(`Server stopped listening on port ${port}`);
            result.client.close();
            console.log('Database connection closed');
        } catch (e) {
            console.log(e);
        } finally {
            process.exit(0);
        }
    });
}).catch(error => {
    console.log(error.name);
    console.log(error.message);
});
