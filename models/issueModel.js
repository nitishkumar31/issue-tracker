const mongoose = require("mongoose")


// Creating Schema for Issues
const issueSchema = new mongoose.Schema({

    title:{
        type:String,
        trim:true,
        required:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    label:{
        type:String,
        trim:true,
        required:true,
    },
    issueAuthor:{
        type:String, 
        trim:true,
        required:true,
    }
},{
    timestamps:true,
})

// Exporting model
module.exports = mongoose.model('Issue',issueSchema)