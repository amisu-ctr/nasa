const mongoose = require('mongoose')

MONGO_URL="mongodb+srv://amisu:CX0LD7kroCDMJLCk@cluster0.yrcbs6i.mongodb.net/nasa?retryWrites=true&w=majority"

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