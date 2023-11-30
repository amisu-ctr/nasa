const express = require('express')
const cors = require('cors')
const app = express();
const path = require("path")
const morgan = require('morgan')

const planetsRouter = require('./routes/planets/planets.router');
const { launches } = require('./models/launches.model');
const launchesRouter = require('./routes/launches/launches.router');
console.log(launches)
// app.use(cors({
//     origin: 'http://localhost:3000',
//   }));
app.use(cors())
app.use(morgan('combined'));

app.use(express.json())



app.use(planetsRouter)
app.use(launchesRouter)

module.exports = app
