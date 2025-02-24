const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://bookstore:bookstore@cluster0.ze7qc.mongodb.net/bookstore')
    .then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    });
};

module.exports = connectDatabase;
