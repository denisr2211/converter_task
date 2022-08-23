const unit = require("./exchange_rates.json");

let calcSumm = function (amount, type, to_type, sourse) {

    if (!unit) {
        throw new Error('Unexpected units');
    } else {
    
        let curencyRate = amount / unit[to_type]


        return {
            "result": {
                "type": to_type,
                "amount": +curencyRate.toFixed(2)
            },
            "source": sourse
        };
    };
};

module.exports = calcSumm;