import React, { useContext, useEffect, useState } from "react";
import logo from "../Logo.png";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "./MainContainer";
import  { refreshSidebarFun } from "../Features/refreshSidebar";
import RefreshIcon from '@mui/icons-material/Refresh';
function Users() {
  const lightTheme = useSelector((state) => state.themeKey);
  const {refresh, setRefresh} = useContext(myContext);
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState([]);
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
      .get("http://localhost:4201/user/fetchUsers", config)
      .then((response) => {
        console.log(response.data);
        setUsersList(response.data);
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
            Available Users
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
          <IconButton
          >
            <SearchIcon />
          </IconButton>
          <input
            placeholder="search"
            className={"search-box" + (lightTheme ? "" : " dark")}
          />
        </div>
        {/*re do if got chance  */}
        <div className={"ug-list" + (lightTheme ? "" : " dark")}>
          {usersList.map((user) => {
            return (
              <motion.div
                key={user._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={"list-item" + (lightTheme ? "" : " dark")}
                onClick={()=>{
                  const config = {
                    headers:{Authorization:`Bearer ${userData.data.token}`}
                  }
                  axios.post('http://localhost:4201/chat/',{userId:user._id},
                  config).then(({data})=>{console.log(data);
                    navigate("/app/chat/" + data._id + "&" + data.chatName)
                  }).catch(e=>console.log(e));
                  //do dispatch here

                  dispatch(refreshSidebarFun());
                 
                }}

              >
                <p className={"convo-icon" + (lightTheme ? "" : " dark")}>
                  {user.name[0]}
                </p>
                <p className={"convo-title" + (lightTheme ? "" : " dark")}>
                  {user.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Users;
