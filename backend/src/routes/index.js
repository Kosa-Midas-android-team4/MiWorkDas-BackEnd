const express = require('express');
const router = express.Router();

const ctrl = require('./ctrl');


// 로그인
router.post('/login', ctrl.process.login);

// 출근 시간 저장
router.post('/saveStartWork', ctrl.process.startWork);

module.exports = router;