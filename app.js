const express = require('express');
const {init} = require('dbase');
require('dotenv').config();

const { PORT } = process.env;
const port = PORT || 5505;

// const { client, db } = init();
// const db = dbase.getDb();
// const client = dbase.getClient();
// console.log('\nclient');
// console.log(client);
// console.log('\n\ndb');
// console.log(db);

const index = require('./routes/index');
const verify = require('./routes/verify');

const app = express();

app.use('/', index);
app.use('/verify', verify);

init().then( result => {
    if (result.db && result.client){
        const server = app.listen(port, () => console.log(`Backend is listening on port ${PORT}`));
        return { db: result.db, client: result.client, server};
    }
}).then( result => {
    process.on('SIGINT', async ()=>{
        try{
            console.log('SIGINT RECEIVED');
            result.server.close();
            result.client.close();
        } catch (e){
            console.log(e);
        } finally {
            process.exit(0);
        }
    });
})
.catch( error => console.log(error));


// process.on('SIGINT', async () => {
//     try {
//         console.log('SIGINT RECEIVED');
//         console.log('closing server');
//         server.close();
//     } catch ( e ){
//         console.log(e);
//     } finally {
//         process.exit(0);
//     }
//     // if (client){
//     //     await client.close();
//     //     console.log('db closed');
//     // }
// });