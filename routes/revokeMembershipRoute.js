const { Router } = require('express')
const { revokeMembershipController } = require('../controllers/membershipController')


const revokeMembershipRoute = Router()

revokeMembershipRoute.post('/', revokeMembershipController)

module.exports = revokeMembershipRoute;