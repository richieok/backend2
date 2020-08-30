const Router = require('express').Router();
const requestIp = require('request-ip');
const {init} = require('dbase');

Router.get('/', (req, res)=>{
    return res.json({
        path: 'index route'
    });
});

Router.get('/products', async (req, res)=>{
    const {db} = await init();
    try{
        const data = await db.collection('products').find({});
        let products = await data.toArray();
        if (products){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(products));
        } else {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                message: 'Not Found'
            }));
        }
    } catch(e){
        console.log(e);
    }
});

Router.get('/ipaddress', (req, res)=>{
    const clientIp = requestIp.getClientIp(req);
    res.json({
        ip: clientIp
    });
});

module.exports = Router;
