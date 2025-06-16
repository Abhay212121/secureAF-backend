
const { body } = require('express-validator')

const validateSignup = [
    body('userName').trim().notEmpty().withMessage('Username can not be empty!').isLength({ min: 3 }).withMessage('Username is too short!'),
    body('userMail').trim().normalizeEmail().notEmpty().withMessage('Enter your email').isEmail().withMessage('Enter a valid email!'),
    body('userPassword').trim().isLength({ min: 4 }).withMessage('Password is too short!')
]


module.exports = { validateSignup }