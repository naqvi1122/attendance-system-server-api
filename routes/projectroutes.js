const express = require('express')
const { signup, login } = require('../controller/longin-signup-controller')
const {Attendance,getMonthReport, updateAttendanceReportOfUser} =require('../controller/atttendancecontroller')
const jwtMiddleware = require('../middleware/jwtmiddleware')




const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/api/attendance',jwtMiddleware, Attendance);
router.post('/api/getMonthReport',jwtMiddleware, getMonthReport);
router.post('/api/updateReport', updateAttendanceReportOfUser);



module.exports = { router };