const express = require('express');
const router = express.Router();
const moviesMethods = require('./methods');

/**/ 
const authMiddleware = require('../../middlewares/authorization');
const List = require('../../models/lists');
const User = require('../../models/users');
console.log("const authMiddleware en movies/index:");
console.log(authMiddleware);
router.use(authMiddleware);  // verifica el token de autorizacion para hacer las operaciones sigientes

router.post('/lists', async (req, res) => {
    console.log("entrando a crear lista en movies/index---> /lists");
    console.log("req.user dentro de crear lista");
    console.log(req.user);
    try {
        const { name, owner, rating, movies } = req.body;
        const newList = new List({
          name, 
          rating, 
          movies,
          owner: req.user._id
        });
        await newList.save();
        res.json(newList);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
});

router.post('/lists/add', async (req, res) => {
    console.log("entrando a agregar pelicula /lists/add");
    console.log("req.body");
    console.log(req.body);
    const listId = req.body._id;
    const movieNew= req.body.movies; 
    const movie = await List.updateOne(
        {_id: listId}, {$addToSet: {"movies": movieNew}}
    );
    res.json(movie);     
});
  
router.get('/lists', async (req, res) => {
    console.log("entrando a consultar movies/lists");
    console.log(req.body);
    const lists = await List.find();
    res.json(lists); 
});

//--------------------------------------------------
/* router.get('/list/all', (req, res) => {
    res.send("Endpoint para consultar las listas de todos los usuarios");
});

router.get('/list/id', (req, res) => {
    res.send("Endpoint para consultar las listas de un usuarios: " + JSON.stringify(req.params));  
}); */
//-------------------------------------------------


module.exports = router;