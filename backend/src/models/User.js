const userStorage = require('./UserStorage');
const crypto = require('./Crypto');

class User {

    // memberCode로 회원 정보 가져오기
    static async getUserInfo(data) {
        try {
            const memberCode = data.memberCode;
            const response = await userStorage.getUserInfo(memberCode);
            return {success: true, user: response};
        } catch(e) {
            return {success: false};
        }
    }

    // memberCode로 로그인
    static async login(data) {
        try {
            const memberCode = await crypto.chiper(data.memberCode); // memberCode
            console.log(memberCode);
            const response = await userStorage.getUserInfo(memberCode);
            const userTimeInfo = await userStorage.getUserTime(memberCode);

            // db 반환 값이 없다면 유저가 없으므로 code: 0 반환
            if(!response) return { success: false, code: 0, user: null };

            response.isWorking = userTimeInfo.isWorking;
            // 어드민일 경우 code: 1, 일반 사원일 경우 code: 2 반환
            if(response.memberIsAdmin) return { success: true, code: 1, user: response};
            return {success: true, code: 2, user: response};
        } catch(e) {
            return { success: false, code: -1, user: null };
        }
    }

    // 출근 처리
    static async startWork(data) {
        try {
            const memberCode = await crypto.chiper(data.memberCode); // memberCode
            const response = await userStorage.saveStartWork(memberCode); // success: true
            return response;
        } catch(e) {
            return { success: false };
        }
    }

    // 퇴근 및 근무 시간 처리
    static async endWork(data) {
        try {
            const memberCode = await crypto.chiper(data.memberCode); // memberCode
            const memberTimeInfo = await userStorage.getUserTime(memberCode);
            if(memberTimeInfo.memberWorkDate === null) memberTimeInfo.memberWorkDate = '[]';
            if(memberTimeInfo.memberWorkTime === null) memberTimeInfo.memberWorkTime = '[]';


            memberTimeInfo.memberWorkDate = JSON.parse(memberTimeInfo.memberWorkDate);
            memberTimeInfo.memberWorkTime = JSON.parse(memberTimeInfo.memberWorkTime);

            // 첫 근무 o
            let idx = memberTimeInfo.memberWorkDate.indexOf(new Date().toISOString().split('T')[0]);
            if(idx === -1) {
                memberTimeInfo.memberWorkDate.push(new Date().toISOString().split('T')[0]);
                memberTimeInfo.memberWorkTime.push((new Date().getTime() - new Date(memberTimeInfo.memberStartWork).getTime()) / 1000);
                idx = 0;
            } else { // 첫 근무 x
                memberTimeInfo.memberWorkTime[idx] += (new Date().getTime() - new Date(memberTimeInfo.memberStartWork).getTime()) / 1000;
            }

            memberTimeInfo.memberWeekHour += (new Date().getTime() - new Date(memberTimeInfo.memberStartWork).getTime()) / 1000;
            memberTimeInfo.memberWorkDate = JSON.stringify(memberTimeInfo.memberWorkDate);


            memberTimeInfo.memberWorkTime = JSON.stringify(parseInt(memberTimeInfo.memberWorkTime[idx]));

            const response = await userStorage.saveEndWork(memberCode, memberTimeInfo); // success: true

            response.memberWeekHour = parseInt(memberTimeInfo.memberWeekHour);
            response.memberWorkTime = JSON.parse(memberTimeInfo.memberWorkTime);    
            return response;
        } catch(e) {
            return { success: false };
        }
    }
}



module.exports = User;