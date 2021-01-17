const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');

// if we make a get request to /, we call the getTransactions function
//  from controllers, which in turn is just going to send 
//  'GET Transactions' to the client
router
.route('/')
.get(getTransactions)
.post(addTransaction);


router
.route('/:id')
.delete(deleteTransaction);


// we have to export he router in order to use it
// we have to bring this file into server.js in order for this to work
module.exports = router;
