const mongoose = require('mongoose');

const username = 'baqar2';
const password = '123456789shah'
const cluster = 'cluster0';
const dbname = 'AttendanceDatabase';
 const uri = `mongodb+srv://${username}:${password}@${cluster}.sqihb0i.mongodb.net/${dbname}?retryWrites=true&w=majority`



//online atles connect
const db =  mongoose.connect  (uri)
    .then(() => console.log('db is connected'))
    .catch(error => console.log(error));

//local connection
// const db=mongoose.connect('mongodb://127.0.0.1:27017/AttendanceDatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });
  

module.exports = { db }
