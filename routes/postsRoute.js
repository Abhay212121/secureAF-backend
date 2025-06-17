const { Router } = require('express')
const { addPostsToTheDb } = require('../controllers/postController')
const verifyToken = require('../middlewares/authMiddleware')

const postsRoute = Router()

postsRoute.post('/', verifyToken, addPostsToTheDb)

module.exports = postsRoute