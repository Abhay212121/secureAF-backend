const { Router } = require('express')
const { addPostsToTheDb, getUsersFromDb, getPosts } = require('../controllers/postController')
const { verifyToken, verifyMember } = require('../middlewares/authMiddleware')

const postsRoute = Router()

postsRoute.get('/', getPosts)
postsRoute.post('/', verifyToken, addPostsToTheDb)

module.exports = postsRoute