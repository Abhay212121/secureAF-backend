const { Router } = require('express')
const { addPostsToTheDb, getPosts } = require('../controllers/postController')
const { verifyToken, verifyMember } = require('../middlewares/authMiddleware')

const postsRoute = Router()

postsRoute.get('/', verifyToken, getPosts)
postsRoute.post('/', verifyToken, addPostsToTheDb)

module.exports = postsRoute