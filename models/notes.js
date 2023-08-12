const mongoose=require('mongoose');
const validator=require('validator');
require('dotenv').config();


const notesSchema=mongoose.Schema({
    
    title:{
        type:String,
       // maxLength:100,
        //required:[true,'You need a title']
    },
    content:{
        type:String,
       // required:[true,'You need some content']
    },
    date:{
        type:Date,
        default:Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       // required: true,
      },
  
})

const Notes = mongoose.model('Notes', notesSchema);
module.exports = { Notes };