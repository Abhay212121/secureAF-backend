const pool = require('./pool')

const addUserToDb = async (username, email, password) => {
    await pool.query('INSERT INTO users(username,email,password) VALUES($1,$2,$3)', [username, email, password])
}

const CheckUserInDb = async (username) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username =($1)', [username])
    return rows;
}

const getUserByUserName = async (username) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = ($1)', [username])
    return rows;
}

const addPostsToDBQuery = async (username, postMessage, postTitle) => {
    await pool.query('INSERT INTO posts(username,post_title,post_message) VALUES($1,$2,$3)', [username, postTitle, postMessage])
}

module.exports = { addUserToDb, CheckUserInDb, getUserByUserName, addPostsToDBQuery }