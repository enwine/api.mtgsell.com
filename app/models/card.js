// For reference purposes only

var Product = function () {

    // Card name in english
    this.name = "";
    // Card multiverse id
    this.multiverse_id = 0;
    // Current MKM stock cards for this item
    this.mkm_stock = 0;
    // Recommended base price
    this.sell_price = 0;
    // Date when this data was created
    this.calculated_on = 0;

    // ONLY PREMIUM USERS
    this.mkm_analysis = new CardMkmAnalysis();

    // ONLY PRO USERS
    this.stock_analysis = new CardStockAnalysis();

};

var ProductStockage = function () {

    // Current MKM stock cards for this item
    this.mkm_stock = 0;
    // User stock of a given card
    this.self_stock = 0;

    // Breakdown of that given user's stock
    this.products = [];

};

var ProductItem = function () {

    // Card multiverse id
    this.multiverse_id = 0;
    // Binder storing the card
    this.binder_id = "";
    // Grading
    this.grading = ""; // GREAT, EXCELENT, POOR
    // Foil
    this.isFoil = false;
    // Adquisition price & date
    this.adquisition_price = 24.65;
    this.adquisition_date = new Date();
    // Selling price & date
    this.selling_price = 39.99;
    this.selling_date = new Date();

};