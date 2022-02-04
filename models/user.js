const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;