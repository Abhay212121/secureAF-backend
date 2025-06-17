const db = require('../db/queries')

const addPostsToTheDb = async (req, res) => {
    const { userName } = req.user
    const { postTitle, postMessage } = req.body

    try {
        await db.addPostsToDBQuery(userName, postTitle, postMessage)
        res.json({ status: 200, msg: 'User added to DB!' })
    } catch (error) {
        res.json({ status: 400, msg: error })
    }
}

module.exports = { addPostsToTheDb }