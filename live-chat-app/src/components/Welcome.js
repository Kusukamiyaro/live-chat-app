import React from 'react'
import logo from "../Logo.png"
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  motion } from "framer-motion";

function Welcome() {
    
  const lightTheme = useSelector((state)=>state.themeKey)
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log('====================================');
  console.log(userData);
  console.log('===================================='); 
  const nav = useNavigate()
  if(!userData){
    nav('/');
  }
  return (
    <div className={"welcome-container" + (lightTheme?"":" dark")}>
        <motion.img src={logo} alt="" className={"welcome-logo" + (lightTheme?"":" dark")}/>
        <b>Hi, {userData.data.name} </b>
        <p>View and text direclty to people present in the chat Rooms.</p>
    </div>
  )
}

export default Welcome