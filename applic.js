const express = require('express');
const parser = require('body-parser');
const calcSumm = require('./modules/transfer.js');

const exApp = express();
const port = process.env.PORT || 8080;



exApp.post('/convert', parser.json(), async (req, res) => {
    if (!req.body) {
        return req.sendStatus(400);
    }
    else {
        
        result = await calcSumm(req.body.convert.amount, req.body.convert.type, req.body.to.type, req.body.withBank);

        res.send(result);
    };   
});


exApp.listen(port, () => {
    console.log(`App listening on port ${port}...`)
});