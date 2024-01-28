import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import React, { useState } from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateGroups() {
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  if(!userData){
    console.log("user is not authenticated");
    navigate('/')
  }
  const user =userData.data;
  const [groupName, setGroupName]= useState('');
  const [open,setOpen]= React.useState(false);
  const handleClickOpen=()=>{
    setOpen(true);
  }
  const changeHandler = (e) => {
    setGroupName( e.target.value );
  }

  const handleClose= ()=>{
 setOpen(false)
  }
const createGroupChat=( )=>{
  const config = {
    headers:{Authorization:`Bearer ${userData.data.token}`}
  }
  axios.post('http://localhost:4201/chat/createGroup',{
    name:groupName,
    users:'["65b4aa24b3eb21b52f0ec3a5","65b4aa24b3eb21b52f0ec3a5","65b63ce4bdacec4ff99de94d"]'
  },
  config);
  //fetch all users and then add to a list next step
  navigate('/app/groups')
}
  return (<>
  
  <div>
  <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you wan to create a Group named "+ groupName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          This will create a group in which oyu will be the admin other will be able to join this group.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>{
            createGroupChat();
            handleClose();
            
          }}
          
          >Agree</Button>
        </DialogActions>
      </Dialog>
  </div>
  <div className={"create-group-container" + (lightTheme?"":" dark")}>
        <input placeholder='Enter Name of the USer' name='groupName' 
      
        onChange={(e) => {
          setGroupName(e.target.value);
        }}
        className={"search-box" + (lightTheme?"":" dark")}/>
        <IconButton  onClick={() => {
            handleClickOpen();
            // createGroup();
          }} >
            <DoneOutlineIcon/>
        </IconButton>
    </div>
  </>
  )
}

export default CreateGroups