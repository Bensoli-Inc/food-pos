//imported ecessary dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

//initialzie new express app
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//database connection
mongooose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  //defining routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});