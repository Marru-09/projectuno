const { Schema, model } = require('mongoose');
const { compare, genSalt, hash } = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Debe ingresar correo electronico']
    },
    name: {
        type: String,
        required: [true, 'Debe ingresar nombre completo']
    },
    nickname: {
        type: String,
        required: [true, 'Debe ingresar un nickname']
    },
    bithdate: {
        type: Date,
        required: [true, 'Debe ingresar su fecha de nacimiento']
    },
    password: {
        type: String,
        required: [true, 'Debe ingresar su contraseña']
    }
},
{
    timetamps: { createAt: 'createAt', updateAt: 'updateAt'}
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await genSalt(+process.env.SALTING_ROUNDS);
    this.password = await hash(this.password, salt);
    next();

});

userSchema.methods.comparePassword = async function(plainText) {
    return await compare(plainText, this.password);
}

const User = model('User', userSchema);
module.exports = User;