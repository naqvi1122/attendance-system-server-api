const mongoose=require('mongoose');

const attendanceSchema=new mongoose.Schema({

name:String,
email:String,
attendance:[
    {
        date: String,
        clockIn: String,
        clockOut:String,
        totalTimeinmin:String,
        totalTimeinhours:String,
    }
]


})
 module.exports=mongoose.model('attendance',attendanceSchema)