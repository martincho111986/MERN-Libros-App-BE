const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/biblioteca', {useNewUrlParser: true, useUnifiedTopology: true});