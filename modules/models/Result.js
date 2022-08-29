class Result {

    constructor(type_from, amount, type_to, sourse) {
        this.type_from = (type_from + '').padStart(0, 3);
        this.amount = amount;
        this.type_to = (type_to + '').padStart(0, 3);
        this.sourse = sourse;
    }

    getTypeFrom() {
        return this.type_from;
    }

    getAmount() {
        return this.amount;
    }

    getTypeTo() {
        return this.type_to;
    }

    getSourse() {
        return this.sourse;
    }
}

module.exports = Result;


// {
//     "result": {
//         "type": "USD", 
//         "amount": 4.03
//     }, 
//     "source": "mono"
// }