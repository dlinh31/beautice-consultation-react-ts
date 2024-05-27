
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/UserRoutes')
app.use(cors())
app.use(express.json())

app.use('/', userRoutes)

app.listen(3001, () => console.log("Listening at port 3001"))

