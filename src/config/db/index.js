const mongoose = require('mongoose')

async function connect() {
    try{
        await mongoose.connect('mongodb://localhost:27017/f8_educantion_dev', {
        });
        console.log('Thành công')
    } catch(error){
        console.log(error);
    }
}
module.exports = {connect}