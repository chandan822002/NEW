const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
app.use(cors())
const port = 3000;


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNo: String,
    email: String,
    address: String,
    street: String,
    city: String,
    state: String,
    country: String,
    loginId: String,
    password: String
});


const User = mongoose.model('User', userSchema);


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://chandankumarsingh18:GsiRhKipR9AUfw2p@cluster0tasks.o6vzm.mongodb.net/", { 
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();
app.post("/saveUser", async (req, res) => {
    try {
   const user = new User(req.body);
   await user.save();
   res.status(201).send({ message: "User saved successfully" });
    } catch (err) {
   console.log("file: index.js:55 app.post err:", err)
   res.status(400).send({ error: err.message });
    }
   });
  
  app.get("/Users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
