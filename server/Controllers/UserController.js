const express = require("express")
const UserModel = require("../models/userModel")
const expressAsyncHAndler = require('express-async-handler');
const genrateToken = require("../Configs/generateToken");

//login
const loginController =expressAsyncHAndler(async(req, res)=>{
  const {name, password} = req.body;
  const user = await  UserModel.findOne({name});
  console.log(res);

  if(user && (await user.matchPassword(password))){
    res.json({
      _id :user.id,
      name:user.name,
      email:user.email,
      isAdmin:true,
      token: genrateToken(user._id),
    })
  }else{
    if(!user.name){
      res.status(403).send("Invalid user name or password")
    }
    throw new Error("invalid username or password")
  }
})

//register
const registerController=expressAsyncHAndler(async (req,res)=>{
 console.log('====================================');
 console.log(req.body);
 console.log('====================================');
  const {name,email,password}= req.body;
  //validate fields
  if(!name||!email||!password){
    throw Error("All required input fiels are not filled");
  }
  //already exist
  const emailFound = await UserModel.findOne({email});
  if(emailFound){
     throw new Error("User Already Exixts")
  }
  const userNameFound = await UserModel.findOne({name});
  if(userNameFound){
     throw new Error("User Already Exixts")
  }
  //create new user
  console.log(res);
  const newUser = await UserModel.create({name,email,password});
  if(newUser){
    res.status(201).json({
      _id :newUser.id,
      name:newUser.name,
      email:newUser.email,
      isAdmin:true,
      token: genrateToken(newUser._id)
    })
  }else{
    res.status(400)
    throw new Error("")
  }
   
})
//fetch user 
const fetchAllUsersController = expressAsyncHAndler(async(req, res)=>{
  const key =req.query.search? {
    $or:[
      {name :{$regex:req.query.search,$options:'i'}},
      {email :{$regex:req.query.search,$options:'i'}}

    ]
  }:{};

  
  const userList = await UserModel.find(key).find({
    _id :{$ne :req.user._id},
  });
   res.send(userList);
})

const  getUserById = expressAsyncHAndler(async(req, res)=>{
 
const {user_id} =  req.params._id;

  
  const user = await UserModel.find({_id:user_id})
  if(user){
    res.status(200).send(user);
  }else{

    res.status(400).send("user not found");
  }
})
module.exports = {loginController, registerController,fetchAllUsersController,getUserById};