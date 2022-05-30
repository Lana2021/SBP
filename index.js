const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRoute = require('./routes/home');

const app = express()

const port = 3000;
mongoose.connect('mongodb://localhost:27017/nodejs_crud');
const db = mongoose.connection;
db.on('error', () => console.log("Something went wrong to connect to database!")); 

db.once('open', () => {
  console.log("DB connection has been made seccessfully");
})


//MIDLLEWARE SETUP
//VIEW ENGINE SETUP
app.set('view engine', 'ejs');

//VIEW FOLDER SETUP
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//ROUTING
app.use('/', homeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})