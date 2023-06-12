const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/connection');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const getRouter = require('../routers/get');
const addRouter = require('../routers/add');
const getClient = require('../routers/client');

dbConnection();
app.use(cors());

app.use('/api', getRouter);
app.use('/api', addRouter);
app.use('/', getClient);


module.exports = app;
