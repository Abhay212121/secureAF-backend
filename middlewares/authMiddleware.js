const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.json({ msg: 'Access denied because no token provided!' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(403).json({ msg: 'Invalid token!' })
    }
};

module.exports = verifyToken;