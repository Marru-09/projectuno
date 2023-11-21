// const jwt = require("jsonwebtoken");
// const List = require('../../models/lists');

// const createList =  async (payload) => {
//     console.log(payload);
//     try {
//         const newList = new List(payload);
//         await newList.save();
//         return newList;       
//     }catch (error) {
//         console.log(error);
//         if (error.code === 11000) throw new error ("Usuario no disponible");
//         else throw error;
//     }
// };

// const getLists = async (payload) => {
//     console.log(payload);
//     try {
//       //const lists = await Task.find({ user : req.user.id }).populate("user");
//       //const lists = await List.find().populate(" list");
//       const lists = await List.find();
//       res.json(lists);
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   };

// module.exports = { createList, getLists}; 