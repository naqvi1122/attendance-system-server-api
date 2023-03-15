const express = require('express')
const { signup, login } = require('../controller/longin-signup-controller')
const {Attendance,getMonthReport} =require('../controller/atttendancecontroller')
const jwtMiddleware = require('../middleware/jwtmiddleware')




const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/api/attendance',jwtMiddleware, Attendance);
router.post('/api/getMonthReport',jwtMiddleware, getMonthReport);



module.exports = { router };