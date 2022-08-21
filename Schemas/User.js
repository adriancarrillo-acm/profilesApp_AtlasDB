const mongoose = require('mongoose')


const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    city: {type: String, required: true}
});


module.exports = mongoose.model('user', userSchema);