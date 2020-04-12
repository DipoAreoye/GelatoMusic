const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },

    songUrl : {
        type : String,
        required: true
    },

    artistTwitter : {
        type : String,
        required: false
    },

    postDate : {
        type : Date,
        required : true,
        default : Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)

