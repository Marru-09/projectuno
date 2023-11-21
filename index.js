//------- con mongoose --------------------- 
//---conexion a BD y lanzamiento del servidor--------
const app = require('./app');
const port = 3000;

const main = async () => {
    const db = require('./db/client');
    await db.connectToMongoDB();

/*  const lista = await client.db("BdNoSQLPrueba")
                            .collection("ColeccionPrueba")      
                            .find()
                            .toArray();
    res.json(lista); */
    
    app.listen(port, () => {
        console.log('Example app listening on port ' + port)
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

