
const express = require("express");
const { loginController, registerController,fetchAllUsersController ,getUserById} = require("../Controllers/UserController");
const { protect } = require("../middlerWare/authMiddlerware");

const  Route = express.Router();
Route.post('/login',loginController);
Route.post('/register',registerController);
Route.get('/fetchUsers',protect, fetchAllUsersController);
Route.get('/:id',protect,getUserById)



module.exports =  Route ;