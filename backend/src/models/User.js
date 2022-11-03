const userStorage = require('./UserStorage');
const crypto = require('./Crypto');


class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        try {
            const memberCode = this.body.memberCode; // memberCode
            const response = await userStorage.getUserInfo(memberCode);
            // db 반환 값이 없다면 유저가 없으므로 code: 0 반환
            if(!response) return { success: false, code: 0 };

            // 어드민일 경우 code: 1, 일반 사원일 경우 code: 2 반환
            if(response.memberIsAdmin) return { success: true, code: 1, user: response};
            return {success: true, code: 2, user: response};
        } catch(e) {
            return { success: false, code: -1 };
        }
    }

    async startWork() {
        try {
            const memberCode = this.body; // memberCode
            const response = await userStorage.saveStartWork(memberCode);
            return response;
        } catch(e) {
            return { success: false };
        }
    }

    async endWork() {
        try {
            const memberCode = this.body; // memberCode
            const startTime = await userStorage.getStartTime(memberCode);
            
            const response = await userStorage.saveEndWork(memberCode, startTime);
            return response;
        } catch(e) {
            return { success: false };
        }
    }
}



module.exports = User;