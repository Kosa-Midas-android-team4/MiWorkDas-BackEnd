
const user = require('../models/User');
const admin = require('../models/Admin');


const userProcess = {
    login: async (req, res) => {
        const response = await user.login(req.body);
        return res.json(response);
    },
    startWork: async (req, res) => {
        const response = await user.startWork(req.body);
        return res.json(response);
    },
    endWork: async (req, res) => {
        const response = await user.endWork(req.body);
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
    },
    updateUser: async(req, res) => {
        const response = await admin.userUpdater(req.body);
        return res.json(response);
    }

}


module.exports = {
    userProcess,
    adminProcess
}