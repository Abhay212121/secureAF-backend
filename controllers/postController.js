const db = require('../db/queries')

const addPostsToTheDb = async (req, res) => {
    const { userName } = req.user
    const { postTitle, postMessage } = req.body

    const date = new Date();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${hours}:${minutes} - ${day}/${month}/${year}`;

    try {
        await db.addPostsToDBQuery(userName, postTitle, postMessage, formattedDate)
        res.json({ status: 200, msg: 'User added to DB!' })
    } catch (error) {
        res.json({ status: 400, msg: error })
    }
}

const getPosts = async (req, res) => {
    const username = req.headers['usernameheader'];
    const data = await db.getPostsFromDb();
    const member = await db.getUserRoleFromDb(username)
    const role = member[0].role;
    res.json({ data: data, status: 200, role: role })
}

module.exports = { addPostsToTheDb, getPosts }