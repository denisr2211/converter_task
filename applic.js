const express = require('express');
const parser = require('body-parser');
const getSumm = require('./modules/transfer.js');
const getResult = require('./modules/models/Classes/Result');
const UndefinedCurrency = require('./modules/models/Classes/Error');

const exApp = express();
const port = process.env.PORT || 8080;



exApp.post('/convert', parser.json(), async (req, res) => {
    if (!req.body) {
        return req.sendStatus(400);
    }
    else {
        try {
            result = await getSumm(req.body.convert.amount, req.body.convert.type, req.body.to.type, req.body.withBank);
            res.send(result.getResult());
        }
        catch (e) {
            if (e instanceof UndefinedCurrency) {
                res.status(321).send({ currency_error: e.message, cur_type: e.originalCurrency });
            }
            else {
                res.status(500).send({ common_error: e.message });
            };
        };
    };
});

exApp.listen(port, () => {
    console.log(`App listening on port ${port}...`)
});