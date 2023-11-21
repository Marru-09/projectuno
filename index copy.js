//------- con mongoose ---------------------
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

/* app.use('/accounts/register',(req, res, next) => { // ejemplo de middlewares encadenados
    console.log('Time: ', Date.now());
    next();
},(req, res, next) => { // ejemplo de middleware encadenado
    console.log('Request Type: ', req.method);
    next();
});

app.use((err, req, res, next) => { // ejemplo de middleware
    console.error(err.stack);
    res.status(500).send('someting broke!');
    next();
}); */

const main = async () => {
    //----ejemplo de middleware predeterminados en express----------
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    //----ejemplo de middleware de terceros
    //app.use(cookieParser());
    //--------------------------------------------------------------

    const accountsController = require('./controllers/accounts');
    const moviesController = require('./controllers/movies');
    const db = require('./db/client');

    await db.connectToMongoDB();

    app.use('/accounts', accountsController);
    app.use('/movies', moviesController);

    app.get('/', async (req, res) => {
        res.send('Bienvenido a nuestro backen');
    });

    app.listen(port, () => {
        console.log('ok listening on port ' + port)
    }); 
}

main();

//----------con mongodb..............................
/* require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const accountsController = require('./controllers/accounts');
const moviesController = require('./controllers/movies');
const db = require('./db/client');

app.use('/accounts', accountsController);
app.use('/movies', moviesController);

app.get('/', async (req, res) => {
    //res.send('Hello world');
    const client = await db.connectToMongoDB();
    const lista = await client.db("BdNoSQLPrueba")
                            .collection("ColeccionPrueba")      
                            .find()
                            .toArray();
    res.json(lista);
});

app.listen(port, () => {
    console.log('ok listening on port ' + port)
}); */

