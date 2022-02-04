const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// kudos
const KudosSchema = new Schema({
    message: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 250
    },
    _senderId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    _receiverId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

const Kudos = mongoose.model('kudos', KudosSchema);
module.exports = Kudos;