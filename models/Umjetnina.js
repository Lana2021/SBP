const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UmjetninaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    opis: {
        type: String,
        required: true
    },
    cijena: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('umjetnina', UmjetninaSchema);