import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ConversationItems({props}) {
    const  navigate = useNavigate()
  const lightTheme = useSelector((state)=>state.themeKey) 
  return (
    <div className=  {"conversation-container" + (lightTheme?"":" dark")} 
        onClick={()=>{navigate('chat')}} >
        <p className={"convo-icon" + (lightTheme?"":" dark")}>{props.name[0]}</p>
        <p className={"convo-title" + (lightTheme?"":" dark")}>{props.name}</p>
        <p className={"convo-lastMessage" + (lightTheme?"":" dark")}>{props.lastMessage}</p>
        <p className={"convo-timeStamp" + (lightTheme?"":" dark")}>{props.timeStamp}</p>

    </div>
  )
}

export default ConversationItems