const userStorage = require('./UserStorage');
const crypto = require('./Crypto');

class User {
    constructor(body) {
        this.body = body;
    }

    async getUserInfo() {
        try {
            const memberCode = this.body.memberCode;
            const response = await userStorage.getUserInfo(memberCode);
            return {success: true, user: response};
        } catch(e) {
            return {success: false};
        }
    }

    async login() {
        try {
            const memberCode = await crypto.chiper(this.body.memberCode); // memberCode
            const response = await userStorage.getUserInfo(memberCode);

            // db 반환 값이 없다면 유저가 없으므로 code: 0 반환
            if(!response) return { success: false, code: 0, user: null };

            // 어드민일 경우 code: 1, 일반 사원일 경우 code: 2 반환
            if(response.memberIsAdmin) return { success: true, code: 1, user: response};
            return {success: true, code: 2, user: response};
        } catch(e) {
            return { success: false, code: -1, user: null };
        }
    }

    async startWork() {
        try {
            const memberCode = this.body.memberCode; // memberCode
            const response = await userStorage.saveStartWork(memberCode); // success: true
            return response;
        } catch(e) {
            return { success: false };
        }
    }

    async endWork() {
        try {
            const memberCode = this.body.memberCode; // memberCode
            const memberTimeInfo = await userStorage.getUserTime(memberCode);
            if(memberTimeInfo.memberWorkDate === null) memberTimeInfo.memberWorkDate = '[]';
            if(memberTimeInfo.memberWorkTime === null) memberTimeInfo.memberWorkTime = '[]';

            memberTimeInfo.memberWorkDate = JSON.parse(memberTimeInfo.memberWorkDate);
            memberTimeInfo.memberWorkTime = JSON.parse(memberTimeInfo.memberWorkTime);

            // 첫 근무 o
            const idx = memberTimeInfo.memberWorkDate.indexOf(new Date().toISOString().split('T')[0]);
            if(idx === -1) {
                memberTimeInfo.memberWorkDate.push(new Date().toISOString().split('T')[0]);
                memberTimeInfo.memberWorkTime.push((new Date().getTime() - new Date(memberTimeInfo.memberStartWork).getTime()) / 1000);
            } else { // 첫 근무 x
                memberTimeInfo.memberWorkTime[idx] += (new Date().getTime() - new Date(memberTimeInfo.memberStartWork).getTime()) / 1000;
            }

            memberTimeInfo.memberWeekHour += (new Date().getTime() - new Date(memberTimeInfo.memberStartWork).getTime()) / 1000;
            memberTimeInfo.memberWorkDate = JSON.stringify(memberTimeInfo.memberWorkDate);
            memberTimeInfo.memberWorkTime = JSON.stringify(memberTimeInfo.memberWorkTime);

            const response = await userStorage.saveEndWork(memberCode, memberTimeInfo); // success: true
            response.memberWeekHour =  memberTimeInfo.memberWeekHour;
            response.memberWorkTime = JSON.parse(memberTimeInfo.memberWorkTime);
            return response;
        } catch(e) {
            console.log(e);
            return { success: false };
        }
    }
}



module.exports = User;