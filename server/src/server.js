const http = require('http');
const app = require('./app');
const mongoose = require('mongoose')

const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

MONGO_URL="mongodb+srv://amisu:CX0LD7kroCDMJLCk@cluster0.yrcbs6i.mongodb.net/nasa?retryWrites=true&w=majority"

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!') /*This can be put anywhere in our file as long as we have required the mongoose */
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function startServer() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
    })
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log('Listening on port ' + PORT + '...')
    })
}


startServer()
