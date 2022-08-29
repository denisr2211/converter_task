const Currency = require('./models/Currency');
const Result = require('./models/Result');
const cc = require('currency-codes');
const apiMono = require('./api_mono');
const apiNbu = require('./api_nbu');

let getSumm = async function (amount, from_type, to_type, sourse) {

    const clientCurCodeFrom = from_type;
    const clientCurCodeTo = to_type;
    const currencyFrom = cc.code(clientCurCodeFrom);
    const currencyTo = cc.code(clientCurCodeTo);
    let result = [];

    if (sourse === 'mono') {

        let data = await apiMono();

        const foundCurrencyFrom = await data.find((cur) => {
            return cur.getCode().toString() === currencyFrom.number;
        });

        const foundCurrencyTo = await data.find((cur) => {
            return cur.getCode().toString() === currencyTo.number;
        });

        if (!foundCurrencyFrom.getCode() || !foundCurrencyFrom.getLetterCode()) {
            return 'Currency didnt found in Monobank API';
        };
        
        let summ = amount * foundCurrencyFrom.getRate() / foundCurrencyTo.getRate();
        summ = summ.toFixed(2);

        const r = new Result(foundCurrencyFrom.getLetterCode(), summ, foundCurrencyTo.getLetterCode(), sourse);
        result.push(r);

        console.log({r})

        return r;
    }

    else if (sourse === 'nbu') {

        let data = await apiNbu();

        const foundCurrencyFrom = data.find((cur) => {
            return cur.getCode().toString() === currencyFrom.number;
        });

        const foundCurrencyTo = data.find((cur) => {
            return cur.getCode().toString() === currencyTo.number;
        });

        if (!foundCurrencyFrom.getCode() || !foundCurrencyFrom.getLetterCode()) {
            return 'Currency didnt found in NBU API';
        };

        let summ = amount * foundCurrencyFrom.getRate() / foundCurrencyTo.getRate();
        summ = summ.toFixed(2);

        const r = new Result(foundCurrencyFrom.getLetterCode(), summ, foundCurrencyTo.getLetterCode(), sourse);
        // result.push(r);

        console.log({r})

        return r;
    }

    else if (sourse != 'mono' || sourse != 'nbu') {
        return 'API not found';
    }
};

module.exports = getSumm;