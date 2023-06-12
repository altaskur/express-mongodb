const express = require('express');
const Score = require('../models/score');

const router = express.Router();

router.post('/', async (req, res) => {

    const { name1, name2, name3, score } = req.body;

    try {
        if (!name1 || !name2 || !name3 || !score) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        const newScore = new Score({
            name: `${name1}${name2}${name3}`,
            score: parseInt(score),
        });

        await newScore.save();
        console.log("Tu puntuación se ha guardado correctamente")
        return res.status(200).json({ message: 'Tu puntuación se ha guardado correctamente' });

    } catch (error) {
        console.error('Error al guardar el score:', error);
        return res.status(500).json({ error: 'Error al guardar la puntuación' });
    }
});

module.exports = router;
