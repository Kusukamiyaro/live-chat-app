import React, { createContext, useContext, useState } from 'react';
import "./MyStyles.css"
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export const myContext = createContext();
function MainContainer() {
  const lightTheme = useSelector((state)=>state.themeKey) 
  const [refresh, setRefresh]= useState(myContext);
  const dispatch = useDispatch();

  return (
   <div className={"mainContainer" + (lightTheme?"":" dark")}>
    <myContext.Provider value={{refresh:refresh,setRefresh:setRefresh}}>
    <Sidebar/>
    <Outlet/>

    </myContext.Provider>
  

   </div>
  );
}

export default MainContainer;