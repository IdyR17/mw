const mongoose = require('mongoose');

const types = mongoose.SchemaTypes;

const email = mongoose.Schema({
    email: {
        type : types.String,
        unique : true
    }
});

const contact = mongoose.Schema({
    name : types.String,
    email: types.String,
    message : types.String,
});

exports.Email = mongoose.model('email', email);
exports.Contact = mongoose.model('contact', contact);