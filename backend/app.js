const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
require('dotenv').config();

const app = express();

const apiRoute = require('./src/routes/index');

app.use(cors());


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded( {extended : true } ));

app.use('/api', apiRoute);

const rule = "0 1 0 * * 7"; // 일요일 0시 1분 마다 실행
schedule.scheduleJob(rule, () => {
    // 초기화 db 실행
    // const query = "UPDATE time set memberWeekHour=0;";
})



module.exports = app;