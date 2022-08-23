const express = require('express');
const parser = require('body-parser');
const { application } = require('express');
const exRates = require('./modules/exchange_rates');
const calcSumm = require('./modules/calc.js');

const exApp = express();
const port = process.env.PORT || 7777;



exApp.post('/convert', parser.json(), (req, res) => {
    if (!req.body) {
        return req.sendStatus(400);
    }
    else {

        console.log(req.body);
        
        result = calcSumm(req.body.convert.amount, req.body.convert.type, req.body.to.type, req.body.withBank);

        res.send(result);
    };   
});


exApp.listen(port, () => {
    console.log(`App listening on port ${port}...`)
});