import React, { useContext, useEffect, useState } from "react";
import logo from "../Logo.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { myContext } from "./MainContainer";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import RefreshIcon from '@mui/icons-material/Refresh';

function Groups() {
  const lightTheme = useSelector((state) => state.themeKey);
  const {refresh, setRefresh} = useContext(myContext);
  const dispatch = useDispatch();

  const [groupList, setGroupList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  if (!userData) {
    navigate(-1);
  }
  useEffect(() => {
    console.log("user effect");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    console.log("user effect");

    axios
      .get("http://localhost:4201/chat/fetchGroups/", config)
      .then((response) => {
        console.log(response.data);
        setGroupList(response.data);
      })
      .catch((e) => console.log(e));
  }, [refresh]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className={"list-container" + (lightTheme ? "" : " dark")}
      >
        <div className="ug-header">
          <img src={logo} alt="" style={{ height: "2rem", width: "2rem" }} />
          <p className={"ug-title" + (lightTheme ? "" : " dark")}>
            Available Groups
          </p>
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            placeholder="search"
            className={"search-box" + (lightTheme ? "" : " dark")}
          />
        </div>
        {/*re do if got chance  */}
        <div className={"ug-list" + (lightTheme ? "" : " dark")}>
          {groupList.map((group, index) => {
        return(  <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={"list-item" + (lightTheme ? "" : " dark")}
            key={index}
              onClick={() => {

                const config = {
                  headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                  },
                };

                axios.put(
                  "http://localhost:4201/chat/addSelfToGroup/",
                  {
                    chatId: group._id,
                    userId: userData.data._id,
                  },
                  config
                );
                
                dispatch(refreshSidebarFun())
                navigate( navigate("/app/chat/" + group._id + "&" + group.chatName))
              }}
            >
              <p className={"convo-icon" + (lightTheme ? "" : " dark")}>{group.chatName[0]}</p>
              <p className={"convo-title" + (lightTheme ? "" : " dark")}>
                {group.chatName}
              </p>
            </motion.div>)
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Groups;
