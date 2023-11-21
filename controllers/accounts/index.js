const express = require('express');
const router = express.Router();
const accountsMethods = require('./methods');

 router.post('/register', async (req, res) => {
    try {
        const user = await accountsMethods.registerUser(req.body);
        res.status(200).json({
            message: 'Usuario registrado exitosamente.',
            data: user
        });        
    }catch (error) {
        res.status(400).json(error);   
    }
});

router.post('/login', async (req, res) => {
    const {user, password} = req.body;
    console.log(req.body);

    try {
        const accessToken = await accountsMethods.loginUser(user, password);
        console.log("accessToken");
        console.log(accessToken);
        if(!accessToken) throw new error('Token invalido');

        res.cookie("token", accessToken);
        res.status(200).json(accessToken);       
    }catch (error) {
        res.status(400)
        .send('Nombre de usuario o contraseña incorrecta');   
    }
});

router.post('/logout', async (req, res) => {
    console.log ("token del id dentro de logout");
    const { tokenl } = req.cookies;
    console.log (tokenl);
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);// ok
  });

/* metodo login anterior de prueba
router.post('/login', async (req, res) => {
    const {user, password} = req.body;
    if (user ==="admin" && password ==="2444y5") {
        const accesToken = await accountsMethods.createToken(user, "admin");
        res.status(400).json(accesToken);
        return;
    } 

    res.status(404)
        .send("usuario o contraseña incorrecta");
}); */


module.exports = router;