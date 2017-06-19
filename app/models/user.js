var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: {type: String, required: true },
    lastname: {type: String, required: true },
    age: {type: Number, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    terapeutId: {type: String},
    isAdmin: {type: Boolean, required: true }
});
