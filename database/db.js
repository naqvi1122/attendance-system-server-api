const mongoose = require('mongoose');

const username = 'baqar2';
const password = '123456789shah'
const cluster = 'cluster0';
const dbname = 'AttendanceDatabase';
const uri = `mongodb+srv://${username}:${password}@${cluster}.sqihb0i.mongodb.net/${dbname}?retryWrites=true&w=majority`

const db =  mongoose.connect  (uri)
    .then(() => console.log('db is connected'))
    .catch(error => console.log(error));
  

module.exports = { db }
