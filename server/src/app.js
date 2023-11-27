const express = require('express')
const cors = require('cors')
const app = express();
const path = require("path")
const morgan = require('morgan')

const planetsRouter = require('./routes/planets/planets.router')

// app.use(cors({
//     origin: 'http://localhost:3000',
//   }));
app.use(cors())
app.use(morgan('combined'));

app.use(express.json())

app.use(express.static(path.join(__dirname,'..','public')))

app.get('/', (req, res) => {
    res.sendFile(path.join)
})

app.use(planetsRouter)

module.exports = app
