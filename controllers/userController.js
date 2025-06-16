const bcrypt = require('bcrypt')
const db = require('../db/queries')
const { validationResult } = require('express-validator');

const feedUsersToDb = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const { userName, userMail, userPassword } = req.body

    try {
        const user = await db.CheckUserInDb(userName)
        if (user.length == 0) {
            const hashedPassword = await bcrypt.hash(userPassword, 8)
            await db.addUserToDb(userName, userMail, hashedPassword)
            return res.status(201).json({ msg: 'User registered successfully!' })
        } else {
            return res.status(409).json([{ msg: 'Username already exists!', path: 'userName' }])
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error!' })
    }
}

const authenticateUser = async (req, res) => {
    let { userName, userPassword } = req.body;
    try {
        const user = await db.getUserByUserName(userName)

        if (user.length === 0) {
            return res.json({ msg: 'User Not Found!', path: 'userName', status: 400 })
        }

        const hashedPassword = user[0].password;
        const isMatch = await bcrypt.compare(userPassword, hashedPassword)

        if (isMatch) {
            res.json({ msg: 'user found', status: 200 })
        }
        else {
            res.json({ msg: 'Password Incorrect', path: 'userPassword', status: 400 })
        }
    } catch (error) {
        res.json({ msg: "Internal Server Error", status: 500 });
    }
}

module.exports = { feedUsersToDb, authenticateUser }