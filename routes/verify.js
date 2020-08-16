const Router = require('express').Router();

Router.get('/', (req, res)=>{
    res.json({
        path: 'verify'
    });
});

module.exports = Router;
