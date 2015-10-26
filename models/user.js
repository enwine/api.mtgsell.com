var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    email:     { type: String },
    password:  { type: String },
    status:    { type: String, enum: ['Active', 'Inactive', 'Banned', 'Deleted'] }
});

module.exports = mongoose.model('User', userSchema);

