const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/biblioteca', {useNewUrlParser: true, useUnifiedTopology: true});