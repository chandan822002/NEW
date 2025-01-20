const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNo: String,
    email: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },
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
        const { firstName, lastName, mobileNo, email, address, loginId, password } = req.body;

        const user = new User({
            firstName,
            lastName,
            mobileNo,
            email,
            address,
            loginId,
            password
        });

        await user.save();
        res.status(201).send({ message: "User saved successfully" });
    } catch (err) {
        console.log("Error in /saveUser:", err);
        res.status(400).send({ error: err.message });
    }
});

// Home route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
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
