const express = require('express');
const { dbConnection } = require("../database/conection");

const router = express.Router();

router.post('/', async (req, res) => {
//   try {
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(501).json({ status: error });
//   }
    dbConnection();
});
module.exports = router;
