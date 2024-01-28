import { IconButton, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import axios from "axios";
import { myContext } from "./MainContainer";
const ENDPOINT = "http://localhost:4201";
var socket, chat;
function ChatArea() {
  const lightTheme = useSelector((state) => state.themeKey);
  const { refresh, setRefresh } = useContext(myContext);

  const [messageContent, setMessageContent] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  console.log(chat_user);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const navigate = useNavigate();
  if (!userData) {
    navigate(-1);
  }
  const [conversations, setConverstation] = useState();
  const sendMessage = () => {
    var data = null;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    console.log("user effect",messageContent);

    axios
      .post(
        "http://localhost:4201/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then((res) => {
        console.log("mssg sent",res);
        data = res.data;
      });
    // socket.emit("new message", data);
  };
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    console.log("user effect");

    axios
      .get("http://localhost:4201/message/" + chat_id, config)
      .then((response) => {
        console.log(response.data);
        setAllMessages(response.data);
        setLoaded(true);
        socket.emit("join chat", chat_id);
      })
      .catch((e) => console.log(e));
    setAllMessages(allMessages);
  }, [refresh, chat_id, userData.data.token]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, {});
  useEffect(() => {
    socket.on("message recieved", (newmessage) => {
      if (!allMessagesCopy || allMessagesCopy._id !== newmessage._id) {
      } else {
        setAllMessages([...allMessages], newmessage);
      }
    });
  });
  const deleteChat=() =>{
    const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };
   axios.put('http://localhost:4201/message/groupExit',{
    userId : userData.data._id,
    chatId:  chat_id
   },config);
  }
  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  }else{

      return (
        <div className={"chatArea-container"  + (lightTheme ? "" : " dark")}>
          <div className={"chartArea-header" + (lightTheme ? "" : " dark")}>
            <p className={"convo-icon"  + (lightTheme ? "" : " dark")}>{chat_user[0]}</p>
            <div className={"header-text"  + (lightTheme ? "" : " dark")}>
              <p className={"convo-title" + (lightTheme ? "" : " dark")}>{chat_user}</p>
              {/* <p className="conco-timestamp">{conversations.timeStamp}</p> */}
            </div>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={"message-container"  + (lightTheme ? "" : " dark")}>
            {allMessages
              .slice(0)
              .reverse()
              .map((message, index) => {

                const sender = message.sender;
                const self_id = userData.data._id;
                if (sender._id !== self_id) {
                  return <MessageOthers props={message} key={index} />;
                } else {
                  return <MessageSelf props={message} key={index} />;
                }
              })}
          </div>
          <div className={"text-input-area" + (lightTheme ? "" : " dark")}>
            <input
              placeholder="Type a Message"
              className={"search-box" + (lightTheme ? "" : " dark")}
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
               
              }}
              onKeyDown={(e) => {
                if (e.code == "Enter") {
                  sendMessage();
                  setMessageContent("");
                  setRefresh(!refresh);
                }
              }}
            />
            <IconButton
              className={"icon" + (lightTheme ? "" : " dark")}
              onClick={() => {
                sendMessage();
                setRefresh(!refresh);
              }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      );
  }
}

export default ChatArea;
