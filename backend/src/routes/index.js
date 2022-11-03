const express = require('express');
const router = express.Router();

const ctrl = require('./ctrl');


// 로그인
router.post('/login', ctrl.userProcess.login);
// 출퇴근 시간 저장
router.post('/saveStartWork', ctrl.userProcess.startWork);
router.post('/saveEndWork', ctrl.userProcess.endWork);

// 관리자가 사원 조회
router.post('/inquireUser', ctrl.adminProcess.inquireUser);
// 관리자가 사원 등록
router.post('/registeUser', ctrl.adminProcess.userRegister);
// 회원 상세 정보 가져오기
router.post('/getUserAllInfo', ctrl.adminProcess.getUserAllInfo);

module.exports = router;