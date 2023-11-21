require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const accountsController = require('./controllers/accounts');
const moviesController = require('./controllers/movies');

app.use('/accounts', accountsController);
app.use('/movies', moviesController);

app.get('/', async (req, res) => {
    res.send('Bienvenido a nuestro Backend');
})

module.exports = app;