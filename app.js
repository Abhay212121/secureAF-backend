require('dotenv').config()
const express = require('express')
const cors = require('cors')
const indexRoute = require('./routes/indexRoute')
const verifyToken = require('./middlewares/authMiddleware')
const postsRoute = require('./routes/postsRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', verifyToken, (req, res) => res.json({ status: 200, msg: 'hello world!' }))
app.use('/api', indexRoute)
app.use('/posts', postsRoute)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running over PORT: ${PORT}`))