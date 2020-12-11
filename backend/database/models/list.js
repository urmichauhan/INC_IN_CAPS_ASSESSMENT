const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
    studentId: Number,
    studentName: String,
    fatherName: String,
    dateOfBirth: String,
    gender: String,
    appliedCourse: String,
    mobileNo: String,
    emailId: String,
    address: String,
    // profilePhoto: String,
    createdate:Date
});

const List = mongoose.model('List', ListSchema);

module.exports = List;