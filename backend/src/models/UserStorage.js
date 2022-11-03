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
        const time = new Date().getTime();
        return new Promise((resolve, reject) => {
            const query = "UPDATE time SET isWorking=true memberStartWork=? WHERE memberCode = ?;";
            db.query(query, [memberCode, time], (err) => {
                if(err) reject(err);
                resolve({success: true});
            })
        })
    }

    static saveEndWork(memberCode, startTime) {
        const time = new Date().getTime() - startTime;
        return new Promise((resolve, reject) => {
            const query = "UPDATE time SET isWoring=false WHERE memberCode = ?;";
            db.query(query, [memberCode], (err) => {
                if(err) reject(err);
                resolve({success: true});
            })
        })
    }

    static getStartTime(memberCode) {
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