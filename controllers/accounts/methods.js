const jwt = require("jsonwebtoken");
const User = require('../../models/users');

const createToken = async (user, role) => {
    console.log("_id, role");
    console.log(user, role);
    const tokenPayload = {
        "_id": user,
        "role": role
    }
    const token = await jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_TTL}
    );
    return token;
}

//module.exports = { createToken};

const registerUser =  async (payload) => {
    try {
        const newUser = new User(payload);
        await newUser.save();
        return newUser;       
    }catch (error) {
        console.log(error);
        if (error.code === 11000) throw new error ("Usuario no disponible");
        else throw error;
    }
};

/* */

const loginUser =  async (username, password) => {
    console.log("username, password");
    console.log(username, password);
    //console.log(User.find({nickname}));
    const user = await User.findOne({ nickname: username});
    console.log("const use._id");
    console.log(user.id);
    if (!user) throw new error ("Usuario no encontrado");    

    const passwordMatch = await user.comparePassword(password);
    console.log("passwordMatch");
    console.log(passwordMatch);  
    if (!passwordMatch) throw new error('Contraseña invalida');
    
    return await createToken(user._id, "normal");
};

module.exports = { createToken, registerUser, loginUser}; 