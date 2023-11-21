// con mongoose ---------------------------------------------------
const { connect, connection } = require('mongoose');
//const { mongoWatchers } = require('./watchers');
const mongoWatchers = require('./watchers');
connectToMongoDB = async () => {
    const connectionString = process.env.DB_URL;
    console.log('const connectionString');
    console.log(connectionString);
    try {
        console.log('Conectando a MongoDB...');
        await connect(connectionString, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log('Conexion con MongoDB establecida');
        connection.on('error', console.error.bind(console, 'Error de conexión:'));
        connection.once('open', () => console.log('conectado a MongoDB'));          
    } catch (e) {
        console.log('Error conectandose a MongoDB');
        console.log(e);
    }finally {
        mongoWatchers.setUpMongoDBProcessWatchers();
    }     
    return null;
};

const closeMongoDB = mongoWatchers.gracefulShutdown;
module.exports = {connectToMongoDB, closeMongoDB};

// con mongodb ---------------------------------------------------
/* const MongoClient = require('mongodb').MongoClient; // mongodb
const mongoWatchers = require('./watchers');
connectToMongoDB = async () => {
    const connectionString = process.env.DB_URL;
    const mongoDBClient = new MongoClient(connectionString);
    try {
        console.log('Conectando a MongoDB...');
        await mongoDBClient.connect();
        console.log('Conexion con MongoDB establecida');
        return mongoDBClient; //retorno la conexion...              
    } catch (e) {
        console.log('Error conectandose a MongoDB');
        console.log(e);
    }finally {
        mongoWatchers.setUpMongoDBProcessWatchers();
    }
      
    return null;
};

const closeMongoDB = mongoWatchers.gracefulShutdown;
module.exports = {connectToMongoDB, closeMongoDB}; */