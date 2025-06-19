const pool = require('./pool')

const addUserToDb = async (username, email, password, role) => {
    await pool.query('INSERT INTO users(username,email,password,role) VALUES($1,$2,$3,$4)', [username, email, password, role])
}

const CheckUserInDb = async (username) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username =($1)', [username])
    return rows;
}

const getUserByUserName = async (username) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = ($1)', [username])
    return rows;
}

const addPostsToDBQuery = async (username, postTitle, postMessage, date) => {
    await pool.query('INSERT INTO posts(username,post_title,post_message,post_time) VALUES($1,$2,$3,$4)', [username, postTitle, postMessage, date])
}

const getPostsFromDb = async () => {
    const { rows } = await pool.query('SELECT * FROM posts')
    return rows;
}

const putMemberRole = async (username) => {
    await pool.query(`UPDATE users SET role = 'is a member' WHERE username = ($1)`, [username])
}

const getUserRoleFromDb = async (username) => {
    const { rows } = await pool.query('SELECT role FROM users WHERE username = $1', [username])
    return rows;
}

const revokeMembershipInDb = async (username) => {
    await pool.query(`UPDATE users SET role = 'not a member' WHERE username = ($1)`, [username])
}

module.exports = { addUserToDb, CheckUserInDb, getUserByUserName, addPostsToDBQuery, getPostsFromDb, putMemberRole, getUserRoleFromDb, revokeMembershipInDb }