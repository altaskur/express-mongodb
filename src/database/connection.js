const mongoose = require('mongoose');
const Score = require('../models/score');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'minesweeper',
        });

        const db = mongoose.connection.db;

        if (db) {
            const collections = await db.listCollections().toArray();
            const collectionNames = collections.map(collection => collection.name);
            if (!collectionNames.includes('scores')) {
                await Score.createCollection();
                console.log("Colección 'scores' creada en la base de datos 'minesweeper'.");
            }
            console.log("Conectado a MongoDB!");
        } else {
            console.error("No se pudo establecer la conexión a la base de datos.");
        }
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};

module.exports = {
    dbConnection,
};
