const db = require('../config/db');

class UserStorage {
    static getUserInfo(memberCode) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE memberCode = ?;";
            db.query(query, [memberCode], (err, data) => {
                if(err) reject(err);
                resolve(data[0]);
            })
        })
    }

    static saveStartWork(memberCode) {
        const time = new Date();
        return new Promise((resolve, reject) => {
            const query = "UPDATE time SET isWorking=true, memberStartWork=? WHERE memberCode = ?;";
            db.query(query, [time, memberCode], (err) => {
                if(err) reject(err);
                resolve({success: true});
            })
        })
    }

    // 근무 날짜, 시간, 현재 근무 여부, 시작 근무 시간 초기화.
    static saveEndWork(memberCode, data) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE time SET memberWorkDate=?, memberWorkTime=?, memberStartWork=null, isWorking=false WHERE memberCode = ?;";
            db.query(query, [data.memberWorkDate, data.memberWorkTime, memberCode], (err) => {
                if(err) reject(err);
                resolve({success: true});
            })
        })
    }

    static getUserTime(memberCode) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM time WHERE memberCode = ?;";
            db.query(query, [memberCode], (err, data) => {
                if(err) reject(err);
                resolve(data[0]);
            })
        })
    }
}


module.exports = UserStorage;