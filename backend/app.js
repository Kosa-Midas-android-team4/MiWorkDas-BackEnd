const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const apiRoute = require('./src/routes/index');

app.use(cors());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded( {extended : true } ));

app.use('/api', apiRoute);





module.exports = app;