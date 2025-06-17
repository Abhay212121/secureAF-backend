const { Router } = require('express')
const { feedUsersToDb, authenticateUser } = require('../controllers/userController')
const { validateSignup } = require('../middlewares/validateUser')


const indexRoute = Router()

indexRoute.post('/signup', validateSignup, feedUsersToDb)
indexRoute.post('/login', authenticateUser)

module.exports = indexRoute