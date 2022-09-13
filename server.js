const express = require('express');
const app = express();
const mongoose = require('mongoose')
const ejs = require('ejs');
const connectDB = require('./config/database.js')
const User = require('./public/Models/Schema');
const { collection } = require('./public/Models/Schema');
require("dotenv").config();


const port = 3000
connectDB()

app.set("view engine", "ejs")
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Collection retrieval
app.get("/", (request,response)=>{
    collection.find({}).sort({ name: 1 }).toArray()
    .then((data) => {response.render("index.ejs", {info: data}
    )})
    .catch((error) => console.error(error))
})

//Add a profile
app.post("/addprofile", (request,response)=>{
    User.create({
        name: request.body.name,
        age: request.body.age,
        state: request.body.state.toUpperCase()})
        .then((result) => {
            console.log(`${request.body.name},  ${request.body.age},  ${request.body.state}`)
            console.log("Profile added!")
            response.json({ message: "Success" })
        })
        .catch((error) => console.error(error))
    })
//Edit a profile
app.post("/editprofile", (request,response)=>{
    User.findOneAndUpdate(
        request.body.oldUser,
        request.body.update,
        {new: true})
        .then((result) => {
            console.log(`Changed to: ${request.body.update.name}, ${request.body.update.age}, ${request.body.update.state}`)
            console.log("Profile Successfully Edited!")
            response.json({ message: "Success" })
        })
        .catch((error) => console.error(error))
    })
//Delete profile
app.delete("/deleteprofile", (request,response)=>{
    User.deleteOne({
        name: request.body.Delname,
        age: request.body.Delage,
        state: request.body.Delstate
    })
        .then((result) => {
            console.log(`${request.body.Delname},  ${request.body.Delage},  ${request.body.Delstate}`)
            console.log("Profile Deleted!")
            response.json({ message: "Success" })
        })
        .catch((error) => console.error(error))
    })

//Delete Many
app.delete("/deletemany", (request,response)=>{
    User.deleteMany({
        name: request.body.Delname,
        age: request.body.Delage,
        state: request.body.Delstate
    })
        .then((result) => {
            console.log(`${request.body.Delname}, ${request.body.Delage}, ${request.body.Delstate}`)
            console.log("Profile Deleted!")
            response.json({ message: "Success" })
        })
        .catch((error) => console.error(error))
    })

app.listen(port, () => {
    console.log('Listening on port 3000!')
})


/* 
app.delete("/deletemany", (request,response)=>{
    User.deleteMany({
        name: request.body.Delname,
        age: request.body.Delage,
        state: request.body.Delstate
    })
        .then((result) => {
            console.log(`${request.body.Delname}, ${request.body.Delage}, ${request.body.Delstate}`)
            console.log("Profile Deleted!")
            response.json({ message: "Success" })
        })
        .catch((error) => console.error(error))
    }) */