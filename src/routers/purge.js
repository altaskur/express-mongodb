const express = require('express');
const Score = require('../models/score');

const router = express.Router();

router.delete('/', async (req, res) => {
  const { order } = req.query;
  console.log(order);
  try {
    if (!order || order !== '66') {
      return res.status(400).json({ error: 'Falta la orden' });
    }
    const result = await Score.deleteMany({});

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'Se han eliminado todos los registros' });
    }
    return res.status(404).json({ message: 'No se encontraron registros para eliminar' });
  } catch (error) {
    console.error('Error al eliminar los registros:', error);
    return res.status(500).json({ error: 'Error al eliminar los registros' });
  }
});

module.exports = router;
