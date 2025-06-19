const bcrypt = require('bcrypt')
const db = require('../db/queries')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config()

//sign up 
const feedUsersToDb = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const { userName, userMail, userPassword } = req.body

    try {
        const user = await db.CheckUserInDb(userName)
        //this is done to avoid duplication of userName.
        if (user.length == 0) {
            const hashedPassword = await bcrypt.hash(userPassword, 8)
            await db.addUserToDb(userName, userMail, hashedPassword, 'not a member')
            return res.status(201).json({ msg: 'User registered successfully!' })
        } else {
            return res.status(409).json([{ msg: 'Username already exists!', path: 'userName' }])
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

//login
const authenticateUser = async (req, res) => {
    let { userName, userPassword, rememberMe } = req.body;
    try {
        const user = await db.getUserByUserName(userName)

        //check if userName exists in db or not.
        if (user.length === 0) {
            return res.json({ msg: 'User Not Found!', path: 'userName', status: 400 })
        }

        const hashedPassword = user[0].password;
        //checking if the password is correct
        const isMatch = await bcrypt.compare(userPassword, hashedPassword)

        //if password doesn't match.
        if (!isMatch) {
            return res.json({ msg: 'Password Incorrect', path: 'userPassword', status: 400 })
        }

        //if password matches.
        const payload = {
            userName: user[0].username,
        }
        const role = user[0].role;
        //creating the token and sending it to the client so the client can store it somewhere.
        const token = jwt.sign(payload, process.env.JWT_SECRET, rememberMe ? { expiresIn: '7d' } : { expiresIn: '3h' })

        res.json({ msg: 'user found', status: 200, token: token, rememberMe: rememberMe, userName: userName, role: role })

    }
    catch (error) {
        res.json({ msg: "Internal Server Error", status: 500 });
    }
}
module.exports = { feedUsersToDb, authenticateUser }