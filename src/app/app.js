const express = require('express');
const cors = require('cors');

const app = express();
const addRouter = require('../routers/add');
const getRouter = require('../routers/get');

app.use(cors());
app.use('/', getRouter);
app.use('/', addRouter);


module.exports = app;
