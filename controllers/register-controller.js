const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

//Call external functions for user registration and auth
const checkUserExists = require("../services/auth-service.checkUserExists");
const addUser = require("../services/user-service.addUser");

async function registerUser (req, res){
//Get submitted form elements and put them in newUser object   
    const { username, email, password, role, name, dob } = req.body;
    const newUser = { username, email, password, role, name, dob };

//Generate hash for storing password securely
    newUser.password = await bcrypt.hash(newUser.password, 10);

//Check if User already exists
    try {
        const userExists = await checkUserExists(username, email);
        if (userExists) {
            return res.status(409).json({ username: "Username or email already exists" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
//User does not exist, insert them into the DB
    try {
        const user_id = await addUser(newUser);
        console.log("User inserted successfuly");
        res.status(201).json({ message: "User created successfully", userId: user_id });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = registerUser;