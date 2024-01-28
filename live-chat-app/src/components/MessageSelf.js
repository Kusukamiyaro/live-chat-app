import React from 'react'
import { useSelector } from 'react-redux'

function MessageSelf({props}) {
  const lightTheme = useSelector((state)=>state.themeKey) 
    const props1 = props;
    console.log(props);
    return (
      <div className={"self-message-container" + (lightTheme?"":" dark")}>
         
          <div className={"message-box" + (lightTheme?"":" dark")}>
          <p className={"conco-lastMessage" + (lightTheme?"":" dark")}>{props1.content}</p>
          {/* <p className={"convo-timeStamp" + (lightTheme?"":" dark")}>12:00</p> */}
  
          </div>
      </div>
    )
}

export default MessageSelf