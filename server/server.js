require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS to allow requests from your React app's origin
app.use(cors({
    origin: "http://localhost:3000", // Replace with your React app's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

//Connect to MongoDB
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yb3jo2c.mongodb.net/${process.env.DB_COLLECTION}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

//MongoDB Schema
const toDoSchema = new mongoose.Schema({
    title: String,
    content: String
});

const ToDo = mongoose.model("ToDo", toDoSchema);

//POST data from React to MongoDB
app.post("/", (req,res) => {
    const newNote = new ToDo({
        title: req.body.title,
        content: req.body.content
    });
    newNote.save();

    res.redirect("/");
});

//GET data from MongoDB
app.get("/getNote", (req,res) => {
    ToDo.find({}).then((foundNote) => {
        res.json(foundNote);
    });
});

//DELETE data from MongoDB
app.delete("/deleteNote/:id", (req,res) => {
    const noteID = req.params.id;

    ToDo.deleteOne({_id:noteID}).exec().then(() => {
        console.log("Deleted");
    }).catch((err) => {
        console.log(err);
    });
});

//Port Server
app.listen(5000, () => {
    console.log("Server started!");
});