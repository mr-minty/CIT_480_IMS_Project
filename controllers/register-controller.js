const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

//Call external functions for user registration and auth
const authService = require("../services/auth-service");
const userService = require("../services/user-service");

async function registerUser (req, res){
//Get submitted form elements and put them in newUser object   
    const { username, email, password, role, name, dob, org_code } = req.body;
    const newUser = { username, email, password, role, name, dob };
    const userCredential = { username, email };

//Generate hash for storing password securely
    newUser.password = await bcrypt.hash(newUser.password, 10);

//Check if org code is valid

    try {
        const validOrg = await authService.verifyOrgCode(org_code);
        console.log("[register-controller] validOrgCode returned obj: ", validOrg);
        if (!validOrg) {
            return res.status(409).json({ orgCode: "This org code is not valid" });
        }
        newUser.org_id = validOrg.org_id;
    } catch(err){
        console.log("[ERROR1]: " + err);
        return res.status(500).json({ 
            error: err.message,
            form: "Something went wrong, please try again."
         });
    }

//Check if User already exists
    try {
        const existingUser = await authService.checkUserCredentials(userCredential);
        if (existingUser) {
            return res.status(409).json({ username: "Username or email already exists" });
        }
    } catch (err) {
        console.log("[ERROR1]: " + err);
        return res.status(500).json({ 
            error: err.message,
            form: "Something went wrong, please try again."
         });
    }

//User does not exist, insert them into the DB
    try {
        //console.log("[PW]: " + password + "\n[HASH]: " + newUser.password); //reeeemove
        const user_id = await userService.addUser(newUser);
        console.log("User inserted successfuly");
        return res.status(201).json({ message: "User created successfully", userId: user_id });
    } catch (err) {
        console.log("[ERROR2]: " + err);
        return res.status(500).json({ 
            err: err.message, 
            form: "Something went wrong, please try again."
        });
    }
}

module.exports = registerUser;