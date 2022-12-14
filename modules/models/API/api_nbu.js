const cc = require('currency-codes');
const NodeCache = require('node-cache');
const axios = require('axios').default;
const Currency = require('../Classes/Currency');
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

let getApi = async function getCurrency() {
    let value = myCache.get('values');
    if (value) {
        console.log('cache found');
        return value;
    };
    let data;
    console.log('cache not found');

    try {
        let response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
        data = response.data;
    }
    catch (e) {
        console.log(e);

    };

    let currencies = [];
    data.forEach(element => {
        elem = cc.number((element.r030 + '').padStart(3, '0'));
        let rate;
        if (elem) {
            if (element.rate) {
                rate = element.rate;
            };

            const c = new Currency(element.r030, elem.code, rate);
            currencies.push(c);
        }
    });

    myCache.set('values', currencies, 600);

    return currencies;
};

module.exports = getApi;