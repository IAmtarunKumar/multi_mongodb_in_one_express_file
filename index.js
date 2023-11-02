const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config()

const app = express();
const port = 5001;

// Connect to the first MongoDB Atlas URI
const firstDBURI = process.env.mongo1;
const firstDBConnection = mongoose.createConnection(firstDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connect to the second MongoDB Atlas URI
const secondDBURI = process.env.mongo2;
const secondDBConnection = mongoose.createConnection(secondDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define schemas and models for the first database
const FirstDBSchema = new mongoose.Schema({
    // Define your schema here
    date1: { type: String, required: true }, //date ordered,
    text1: { type: String, required: true }, //text

});

const FirstDBModel = firstDBConnection.model('TestFirstDBModel', FirstDBSchema);

// Define schemas and models for the second database
const SecondDBSchema = new mongoose.Schema({
    // Define your schema here
    date2: { type: String, required: true }, //date ordered,
    text2: { type: String, required: true }, //text
});

const SecondDBModel = secondDBConnection.model('TestSecondDBModel', SecondDBSchema);

// Define your API endpoints here for the first and second databases
app.get('/first', async (req, res) => {
    try {
        // Use FirstDBModel to manipulate the first database collection
        const newModel = new FirstDBModel({
            date1: "yes",
            text1: "textyes"
        });
        const response = await newModel.save();
        console.log("response from the 1newmodelsave", response)
        return res.send('Manipulating first database collection');
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.get('/second', async (req, res) => {
    try {
        // Use SecondDBModel to manipulate the second database collection
        const newModel = new SecondDBModel({
            date2: "yes2",
            text2: "textyes2"
        });
        const response = await newModel.save();
        console.log("response from the 2newmodelsave", response)
        return res.send('Manipulating second database collection');
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});