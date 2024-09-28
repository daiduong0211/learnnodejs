const Course = require('../models/Course');

async function getData(res) {
    try {
        const data = await Course.find({ name: 'Test' });
        console.log(data)
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: 'ERROR!!!' });
    }
}

class NewController {
    index(req, res) {
        getData(res);
    }
}

module.exports = new NewController();
