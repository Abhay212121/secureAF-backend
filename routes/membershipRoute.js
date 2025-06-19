const { Router } = require('express')
const { verifyToken } = require('../middlewares/authMiddleware')
const { handleMembershipPost } = require('../controllers/membershipController')

const membershipRoute = Router()

membershipRoute.post('/', verifyToken, handleMembershipPost)


module.exports = membershipRoute;