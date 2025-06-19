const { Router } = require('express')
const { addPostsToTheDb, getPosts } = require('../controllers/postController')
const { verifyToken } = require('../middlewares/authMiddleware')

const postsRoute = Router()

postsRoute.get('/', getPosts)
postsRoute.post('/', verifyToken, addPostsToTheDb)

module.exports = postsRoute