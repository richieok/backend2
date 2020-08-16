const Router = require('express').Router();

Router.get('/', (req, res)=>{
    req.session.visits = ( req.session.visits || 0) + 1;
    res.json({
        path: 'verify',
        visits: req.session.visits
    });
});

module.exports = Router;
