const { Router } = require('express')
const handleMembershipPost = require('../controllers/membershipController')
const { verifyToken } = require('../middlewares/authMiddleware')

const membershipRoute = Router()

membershipRoute.post('/', verifyToken, handleMembershipPost)

module.exports = membershipRoute