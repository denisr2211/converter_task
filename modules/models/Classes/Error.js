function UndefinedCurrency(message, originalCurrency){
    this.message = message;
    this.originalCurrency = originalCurrency;
}

UndefinedCurrency.prototype = new Error();

module.exports = UndefinedCurrency;