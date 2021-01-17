const mongoose = require('mongoose');


// calls to mongoose returns a promise so we use async await, and a try catch block
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true

        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    }

    catch  (err) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1);

    }
}

// need to export

module.exports = connectDB;
