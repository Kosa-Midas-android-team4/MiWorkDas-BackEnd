const db = require('../config/db');
const adminStorage = require('./AdminStorage');
const crypto = require('./Crypto');

class Admin {

    // 관리자가 모든 사원 조회
    static async inquireUser() {
      try {
        const userList = await adminStorage.getUserList();
        
        // 현재 근무 상태 저장 및 암호 복호화
        for(let i = 0; i < userList.length; i++) {
            const data = await adminStorage.getUserTime("memberCode", userList[i].memberCode);
            userList[i].isWorking = data.isWorking;
            userList[i].memberCode = crypto.dechiper(userList[i].memberCode);
        }
            
        return {success: true, userList};
      } catch(e) {
        return { success: false };
      }
    }

    static createMemberCode() {
        return Math.random().toString(36).substring(2, 12);
    }

    static async userRegister(client) {
        try {
            let checkDB = await adminStorage.getUserInfo("memberPhone", client.memberPhone)
            // 이미 등록 되어 있는 회원
            if(checkDB !== undefined) return { success: false, already: true };

            // 중복 없을 때까지 멤버 코드 생성
            let memberCode;
            while(true) {
                memberCode = this.createMemberCode();
                memberCode = await crypto.chiper(memberCode);
                checkDB = await adminStorage.getUserInfo("memberCode", memberCode);
                if(checkDB === undefined) break;
            }

            client.memberCode = memberCode;

            const response = await adminStorage.saveUser(client);
            response.memberCode = await crypto.dechiper(memberCode);
            return response // success, memberCode
        } catch(e) {
            console.log(e);
            return {success: false, already: false};
        }
    }
}


module.exports = Admin;