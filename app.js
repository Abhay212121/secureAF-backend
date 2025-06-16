require('dotenv').config()
const express = require('express')
const cors = require('cors')
const indexRoute = require('./routes/indexRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ msg: 'hello world!' }))
app.use('/api', indexRoute)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running over PORT: ${PORT}`))