const attendanceSchema = require('../model/attendance')
const mongoose = require('mongoose');

//best working for save user attendance clock in timeclock out time and also total working hours user work 
const Attendance = async (req, resp) => {
    const email = req.body.email;
    console.log(email);
    const currentTime = new Date();
    let user = null;
  
    try {
      user = await attendanceSchema.findOne({ email: email });
    } catch (err) {
      console.error(err);
      resp.status(500).json({ error: 'Server error' });
      return;
    }
  
    if (!user) {
      // If the user does not exist, create a new attendance record
      const attendance = new attendanceSchema({
        name: 'naqvi kingdom',
        email: email,
        attendance: [
          {
            date: `${currentTime.getMonth() + 1}/${currentTime.getDate()}/${currentTime.getFullYear()}`,
            clockIn: `${currentTime.getHours()}:${currentTime.getMinutes()}`,
          },
        ],
      });
  
      try {
        var tt = await attendance.save();
      } catch (err) {
        console.error(err);
        resp.status(500).json({ error: 'Server error' });
        return;
      }
  
      resp.json({ message: 'Clocked in successfully', clockindata: tt });
    } else {
      // Check if the user has already clocked in and out for the day
      const today = `${currentTime.getMonth() + 1}/${currentTime.getDate()}/${currentTime.getFullYear()}`;
      const attendanceRecord = user.attendance.find(
        (record) => record.date === today
      );
      console.log('attendanceeeeeeeeeeeee',attendanceRecord)
  
      if (!attendanceRecord) {
        // If the user has not clocked in or out today, clock in
        user.attendance.push({
          date: today,
          clockIn: `${currentTime.getHours()}:${currentTime.getMinutes()}`,
        });
  
        try {
          await user.save();
        } catch (err) {
          console.error(err);
          resp.status(500).json({ error: 'Server error' });
          return;
        }
  
        resp.json({ message: 'Clocked in successfully' });
      } else if (attendanceRecord.clockOut) {
        // If the user has already clocked in and out today, return an error message
        resp
          .status(400)
          .json({ error: 'Already clocked in and out for the day' });
      } else {
        // If the user has only clocked in, clock out
        attendanceRecord.clockOut = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
        const clockInTime = attendanceRecord.clockIn.split(':');
        const clockOutTime = attendanceRecord.clockOut.split(':');
        const totalTimeInMinutes =
          (clockOutTime[0] - clockInTime[0]) * 60 +
          (clockOutTime[1] - clockInTime[1]);
        attendanceRecord.totalTimeinmin = totalTimeInMinutes;
        attendanceRecord.totalTimeinhours =  Math.floor(totalTimeInMinutes / 60);
  
        try {
          await user.save();
        } catch (err) {
          console.error(err);
          resp.status(500).json({ error: 'Server error' });
          return;
        }
  
        // Convert total time to hours and minutes
        const totalHours = Math.floor(totalTimeInMinutes / 60);
        const totalMinutes = totalTimeInMinutes % 60;
  
        resp.json({
          message: 'Clocked out successfully',
          totalTimeWorked: `${totalHours} hours and ${totalMinutes} minutes`,
        });
      }
    }
  };





  async function getMonthReport (req,resp) {

    const email = req.body.email;
    const month = req.body.month;
    const regex = new RegExp(`^${month}\\/\\d{1,2}\\/\\d{4}$`); // regex to match dates with the given month
   
    let user = null;
  
    try {
      user = await attendanceSchema.findOne({ email: email });
    } catch (err) {
      console.error(err);
      resp.status(500).json({ error: 'Server error' });
      return;
    }
  
    if (!user) {
      // If the user does not exist, return a not found error
      resp.status(404).json({ error: 'User not found' });
    } else {
      // Find all attendance records that match the given month
      const attendanceRecords = user.attendance.filter(
        (record) => regex.test(record.date)
      );
      console.log('w',attendanceRecords)
  
      if (attendanceRecords.length === 0) {
        // If no records are found, return a not found error
        resp.status(404).json({ error: 'No attendance records found for the given month' });
      } else {
        // Return the attendance records
        resp.json({ attendance: attendanceRecords });
      }
    }
  
  }

  async function updateAttendanceReportOfUser(req,resp){
    const{email,date,clockIn,clockOut}= req.body
    const filter = { email, "attendance.date": date }
    const update = { $set: { "attendance.$.clockIn": clockIn,"attendance.$.clockOut":clockOut } };
    const result = await attendanceSchema.updateOne(filter, update);
    console.log('Filtered attendance:', result);
    resp.json({ message:"record updated", result });
  }



  module.exports={Attendance,getMonthReport,updateAttendanceReportOfUser};