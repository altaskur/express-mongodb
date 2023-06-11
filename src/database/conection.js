const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        console.log("Conectando a MongoDB")
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to mongo!")
    } catch (error) {
        console.log("Cannot connect")
    }
}

module.exports = {
    dbConnection
}