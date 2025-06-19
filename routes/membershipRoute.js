const { Router } = require('express')
const { verifyToken } = require('../middlewares/authMiddleware')
const { handleMembershipPost, revokeMembershipController } = require('../controllers/membershipController')

const membershipRoute = Router()
const revokeMembership = Router()

membershipRoute.post('/', verifyToken, handleMembershipPost)
revokeMembership.post('/', revokeMembershipController)

module.exports = { membershipRoute, revokeMembership }