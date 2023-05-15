const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGO_URL;

const connectToDatabase = async () => {
    
    try {
        let response = await mongoose.connect(URL);
        console.log("hello db")
    } catch (error) {
        console.error(error)
        console.log("There is an error connecting to the Database");
    }  
}

module.exports = connectToDatabase;

// , { useNewUrlParser: true, useUnifiedTopology: true }