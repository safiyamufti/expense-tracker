const Transaction = require('../models/Transaction'); // we should be able to use mongoose methods on this

// here we will have all our methods that use our model to interact with the database

// @desc  get all transactions
// @route GET /api/v1/transactions
// @access Public (since we don't have user authentication atm)

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find(); // we use the find method on the trandsaction model
        // we want to return a repsponse of 200 -OK
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });


    } catch (err) {
        return res.status(500).json ({
            success: false,
            error: 'Server Error'
        });

    }
}

// @desc  Add a transaction
// @route POST /api/v1/transactions
// @access Public 

exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await Transaction.create(req.body);
        return res.status(201).json ({
            success: true,
            data: transaction
        });
        
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            // error 400 bc client side error
            return res.status(400).json ({
                success: false,
                error: messages
            });

        } else {
            // error 500 bc app side error
            return res.status(500).json ({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc  Delete a transaction
// @route DELETE /api/v1/transactions/: id ( we need an id here! )
// @access Public

exports.deleteTransaction = async (req, res, next) => {
    try {
        // need to make sure the transaction to be deleted actuall exists
        const transaction = await Transaction.findById(req.params.id); 
        if (!transaction) {
            // error 404 bc not found
            return res.status(404).json ({
                success: false,
                error: 'No transaction found'
            });
        }
        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
            
    } catch (err) {
        return res.status(500).json ({
            success: false,
            error: 'Server Error'
        });
    }
}


