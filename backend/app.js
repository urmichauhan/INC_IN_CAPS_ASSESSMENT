const express = require('express');
const app = express();
const mongoose = require("./database/mongoose");

// app.use(cors())
const List = require("./database/models/list");
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Lists operation
app.get('/studentlist', (req, res) => {
    List.find({}).then(lists => {
        res.send(lists)
    }).catch((error) => {
        console.log(error);
    })
});

app.post('/studentlist', (req, res) => {
    new List({
        'studentId': req.body.studentId,
        'studentName': req.body.studentName,
        'fatherName': req.body.fatherName,
        'dateOfBirth': req.body.dateOfBirth,
        'gender': req.body.gender,
        'appliedCourse': req.body.appliedCourse,
        'mobileNo': req.body.mobileNo,
        'emailId': req.body.emailId,
        'address': req.body.address,
        // 'profilePhoto': req.body.profilePhoto,
        'createdon': new Date()
    }).save()
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.get('/studentlist/:_id', (req, res) => {
    List.find({ _id: req.params._id })
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.patch('/studentlist/:_id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params._id }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.delete('/studentlist/:_id', (req, res) => {
    List.findByIdAndDelete({ _id: req.params._id }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.listen(3000, () => console.log("Server connected on port 3000"));