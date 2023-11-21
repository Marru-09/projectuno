const { ObjectId } = require('mongodb');
const { Schema, model, default: mongoose } = require('mongoose');
var  User = mongoose.model('User')
const listSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Debe ingresar titulo de lista peliculas']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        //type: String,
        required: [true, 'El codigo del usuario es obligatorio']
    },
    rating: {
        type: Number,
        default: 5,
        required: [true, 'Debe ingresar calificacion de lista peliculas']
    },
    movies: [{ title: String, year: Number, image: String }]
},
{
    timetamps: { createAt: 'createAt', updateAt: 'updateAt'}
});

const List = model('List', listSchema);
module.exports = List;
