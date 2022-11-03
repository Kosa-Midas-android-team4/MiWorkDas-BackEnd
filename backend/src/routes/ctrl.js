
const User = require('../models/User');
const admin = require('../models/Admin');


const userProcess = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    startWork: async (req, res) => {
        const user = new User(req.body);
        const response = await user.startWork();
        return res.json(response);
    },
    endWork: async (req, res) => {
        const user = new User(req.body);
        const response = await user.endWork();
        return res.json(response);
    }
}

const adminProcess = {
    inquireUser: async (req, res) => {
        const response = await admin.inquireUser();
        return res.json(response);
    },
    userRegister: async (req, res) => {
        const response = await admin.userRegister(req.body);
        return res.json(response);
    },
    getUserAllInfo: async(req, res) => {
        const response = await admin.getUserAllInfo(req.body.memberCode);
        return res.json(response);
    }

}


module.exports = {
    userProcess,
    adminProcess
}