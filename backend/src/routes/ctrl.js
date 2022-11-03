
const User = require('../models/User');


const process = {
    login: async (req, res) => {
        console.log(req.body);
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


module.exports = {
    process
}