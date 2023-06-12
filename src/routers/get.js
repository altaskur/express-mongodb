const express = require('express');
const Score = require('../models/score');
const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const scores = await Score.find();
        return res.json(scores);
    } catch (error) {
        console.error('Error al obtener las puntuaciones:', error);
        return res.status(500).json({ error: 'Error al obtener las puntuaciones' });
    }
});
module.exports = router;
