const { Router } = require('express')
const { addPostsToTheDb, getUsersFromDb } = require('../controllers/postController')
const verifyToken = require('../middlewares/authMiddleware')

const postsRoute = Router()

postsRoute.get('/', getUsersFromDb)
postsRoute.post('/', verifyToken, addPostsToTheDb)

module.exports = postsRoute