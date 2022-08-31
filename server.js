let express = require('express');
let app = express();
/*let path = require('path');
let fs = require('fs');*/
let mongoose = require('mongoose')
let { MongoClient, ServerApiVersion } = require('mongodb');
let { Schema } = mongoose;
let ejs = require('ejs');
require("dotenv").config();


const port = 3000
const dbURL = process.env.uri;
const connection = mongoose.connection;
const collection = connection.collection('users');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
    dbName: 'test_appDB',
}

app.set("view engine", "ejs")
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    state: {type: String, required: true}
});

const User = mongoose.model('user', userSchema);


// Use connect method to connect to the server
mongoose.connect(dbURL, options).then(()=>{
    console.log("Succesfully connected to database!!");
}).catch((err)=>{
    throw err});

//Add multiple data
/*     try{
        let addData = User.insertMany([
            { name: "Millie" , age: 22, state: "NY" },
            { name: "Nancy", age: 21, state: "FL" }, 
            { name: "Jose", age: 31, state: "CA" },
            { name: "Diego", age: 41, state: "TX" }
        ])
        console.log(`Users ${addData[0].name} & ${addData[1].name} added!`);
    }
    catch(e){
        console.error(e);
    }

//Add one data set
    try{
        let addOne = User.create(
            { name: "Adrian" , age: 29, state: "TX" }
        )
        console.log(`User ${addOne.name} added!`);
    }
    catch(e){
        console.error(e);
    } */

//Update data
/*     try{
        const updateResult = User.updateMany({ age: 31 }, { $set: { age: 10 } });
        console.log('Updated documents =>', updateResult);
        }
    catch(e){
        console.error(e);
    } */

//Delete ALL data
 /*    try{
        const deleteResult = collection.deleteMany({});
        console.log('Deleted documents =>', deleteResult);
    }
    catch(e){
        console.error(e);
    } */


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
app.post("/addprofile", (request,response)=>{
    User.replaceOne({
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
            console.log(`${request.body.Delname}, ${request.body.Delage}, ${request.body.Delstate} Deleted`)
            response.json({ message: "Success" })
        })
        .catch((error) => console.error(error))
    })

app.listen(port, () => {
    console.log('Listening on port 3000!')
})
