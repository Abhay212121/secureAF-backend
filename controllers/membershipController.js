require('dotenv').config()
const db = require('../db/queries')

const handleMembershipPost = async (req, res) => {
    const key = req.body.key;
    try {
        //correct key is entered.
        if (key === process.env.MEMBERSHIP_KEY) {
            const username = req.user.userName;
            //update the db
            await db.putMemberRole(username)
            return res.json({ status: 200, msg: 'Membership added!' })
        }
        return res.json({ status: 403, msg: 'Wrong key!' })
    } catch (error) {
        return res.json({ status: 500, msg: 'Internal server error!' })
    }
}

module.exports = handleMembershipPost