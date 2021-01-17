const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },

    amount: {
        type: Number,
        trim: true,
        required: [true, 'Please add a positive or negative number']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export to bring into our controller
// when we make a request and send data, it is only going to accept text & ammount- nothing else
module.exports = mongoose.model('Transaction', TransactionSchema);


