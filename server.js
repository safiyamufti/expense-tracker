const path = require ('path'); // path module for node
// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// dotenv needs to know where the config file is
dotenv.config({ path: './config/config.env' });


connectDB();

// mount the router
const transactions = require('./routes/transactions');

// Initialize Express App
const app = express();

//
app.use(express.json());

// morgan
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// we nedd to put the route here that we want to connect to the transactions route
app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(
        path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;


// to run the server, we have to listen on a port
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


