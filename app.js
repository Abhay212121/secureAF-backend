require('dotenv').config()
const express = require('express')
const cors = require('cors')
const indexRoute = require('./routes/indexRoute')
const postsRoute = require('./routes/postsRoute')
const revokeMembershipRoute = require('./routes/revokeMembershipRoute')
const membershipRoute = require('./routes/membershipRoute')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', indexRoute)
app.use('/posts', postsRoute)
app.use('/membership', membershipRoute)
app.use('/revokeMembership', revokeMembershipRoute)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running over PORT: ${PORT}`))