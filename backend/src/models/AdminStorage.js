const db = require('../config/db');

class AdminStorage {

    static getUserInfo(type, val) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE ${type} = ?;`;
            db.query(query, [val], (err, data) => {
                if(err) reject(err);
                resolve(data[0]);
            })
        })
    }

    static getUserTime(type, val) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM time WHERE ${type} = ?;`;
            db.query(query, [val], (err, data) => {
                if(err) reject(err);
                resolve(data[0]);
            })
        })
    }

    static getUserList() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users";
            db.query(query, (err, data) => {
                if(err) reject(err);
                resolve(data);
            })
        })
    }

// memberCode, memberName, memberDepart, memberRank, memberPhone, memberIsAdmin
// 있어야 됨 admin은 여기서 처리 code는 Admin.js에서 처리
    static saveUser(client) { 
        return new Promise((resolve, reject) => {
            const query1 = "INSERT INTO users(memberCode, memberName, memberDepart, memberRank, memberPhone, memberIsAdmin) VALUES(?, ?, ?, ?, ?, ?);";
            const query2 = "INSERT INTO time(memberCode) VALUES(?);";
            db.query(query1 + query2,
                [client.memberCode, client.memberName, client.memberDepart, client.memberRank, client.memberPhone, client.memberIsAdmin, client.memberCode],
                (err) => {
                    if(err) reject(err);
                    resolve({success: true});
                })
        })
    }
}

module.exports = AdminStorage;
