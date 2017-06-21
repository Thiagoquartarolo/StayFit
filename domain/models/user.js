var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', {
    name: {type: String, required: true },
    lastname: {type: String, required: true },
    age: {type: Number, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    terapeutId: { type: Schema.Types.ObjectId, ref: 'user' },
    isAdmin: {type: Boolean, required: true }
});
