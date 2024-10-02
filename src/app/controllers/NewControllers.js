const Course = require('../models/Course');

class NewController {
    index(req, res) {
        Course.find({})
        .then(course => 
            {
                course = course.map(course => course.toObject())
                res.render('home', {course}) 
        })
    }
}

module.exports = new NewController();
