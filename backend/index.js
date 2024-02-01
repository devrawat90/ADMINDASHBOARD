const express = require("express"); //import express
const app = express();
const mongoose = require("mongoose");  // import mongoose

const rout = require("./routes/route") // import rout
const dotenv = require("dotenv"); // Import the dotenv library
dotenv.config(); // Load environment variables from .env

const cors = require("cors")
app.use(cors({
    origin: true,
})) // unblock the cors policy of browser
app.use(express.json())
const PORT = 8080;
const dburl = process.env.DBURL;
// Connect to the database
mongoose
    .connect(dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });
app.use(rout)
//  listen port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
