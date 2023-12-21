const mongoose = require('mongoose')

MONGO_URL= process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!') /*This can be put anywhere in our file as long as we've required the mongoose */
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
    })
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}