
const User = require('../models/User');


const process = {
    login: async (req, res) => {
        console.log(req.body);
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    startWork: (req, res) => {
        const user = new User(req.body);
        const response = user.startWork();
        return res.json(response);
    },
    endWork: (req, res) => {
        const user = new User(req.body);
        const response = user.endWork();
        return res.json(response);
    }
}


module.exports = {
    process
}