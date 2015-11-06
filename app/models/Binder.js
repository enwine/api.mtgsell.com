// For reference purposes only

module.exports = function (name, color, collection, owner) {

    this.name = name || "New binder";
    this.color = color || "#006699";
    this.collection = collection || null;
    this.owner = owner || null;
    this.items = [];
    this.count = 0;

};
