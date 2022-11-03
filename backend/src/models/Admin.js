const db = require('../config/db');
const adminStorage = require('./AdminStorage');
const crypto = require('./Crypto');

class Admin {

    // 유저 상세 정보 가져오기
    static async getUserAllInfo(memberCode) {
        try {
            memberCode = await crypto.chiper(memberCode);
            const userAllInfo = await adminStorage.getUserInfo("memberCode", memberCode);
            const userTimeInfo = await adminStorage.getUserTime("memberCode", memberCode);

            userAllInfo.memberWeekHour = userTimeInfo.memberWeekHour;
            userAllInfo.isWorking = userTimeInfo.isWorking;

            return {success: true, user: userAllInfo};
        } catch(e) {
            console.log(e);
            return { success: false }
        }
    }

    // 관리자가 모든 사원 조회
    static async inquireUser() {
      try {
        const userList = await adminStorage.getUserList();
        
        // 현재 근무 상태 및 암호 복호화 후 저장
        for(let i = 0; i < userList.length; i++) {
            const data = await adminStorage.getUserTime("memberCode", userList[i].memberCode);
            userList[i].isWorking = data.isWorking;
            userList[i].memberCode = await crypto.dechiper(userList[i].memberCode);
        }

            
        return {success: true, userList};
      } catch(e) {
        return { success: false };
      }
    }

    // 랜덤 코드 생성
    static createMemberCode() {
        return Math.random().toString(36).substring(2, 12);
    }

    // 사원 등록
    static async userRegister(client) {
        try {
            let checkDB = await adminStorage.getUserInfo("memberPhone", client.memberPhone)
            // 전화번호로 이미 있는 회원 유무 체크
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
            return {success: false, already: false};
        }
    }

    // 사원 정보 수정
    static async userUpdater(client) {
        try {
            console.log(client);
            client.memberCode = await crypto.chiper(client.memberCode);
            const response = adminStorage.updateUser(client); // success
            return response;
        } catch(e) {
            return { success: false };
        }
    }
}


module.exports = Admin;