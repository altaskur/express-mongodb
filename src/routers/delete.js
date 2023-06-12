const express = require('express');

const router = express.Router();
const Score = require('../models/score');

router.delete('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    if (!id) {
      return res.status(400).json({ error: 'Falta la orden' });
    }
    const result = await Score.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'El registro ha sido eliminado' });
    }
    return res.status(404).json({ message: 'No se encontró el registro' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    return res.status(500).json({ error: 'Error al eliminar el registro' });
  }
});

module.exports = router;
