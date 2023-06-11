const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());

// const addRouter = require('../routers/add');
const getRouter = require('../routers/get');
const postRouter = require('../routers/post');
const getClient = require('../routers/client');

app.use(cors());

app.use('/api', getRouter);
app.use('/api', postRouter);
app.use('/', getClient);


module.exports = app;
