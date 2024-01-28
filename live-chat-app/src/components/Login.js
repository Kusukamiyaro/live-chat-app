import React, { useState } from "react";
import logo from "../Logo.png";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toaster from "./Toaster";
function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");
  const navigate = useNavigate();
  const changeHandler = (e) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const logInHandler = async (e) => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        Headers: {
          "Content-type": "application.json",
        },
      };
      const respose = await axios
        .post("http://localhost:4201/user/login", data, config)
        .then((response) => {
          localStorage.setItem("userData", JSON.stringify(response));
          console.log("logged", response);
          setLogInStatus({ msg: "Logged in successfully", key: Math.random() });
          navigate("/app/welcome");
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      if (e.respose.status === 403 || e.respose.status === 500) {
        setLogInStatus({
          msg: "Invalif user name or password",
          key: Math.random(),
        });
      } else {
      }
    }
  };
  const signUpHandler = async (e) => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        Headers: {
          "Content-type": "application.json",
        },
      };
      const respose = await axios
        .post("http://localhost:4201/user/register", data, config)
        .then((result) => {
          console.log(result);

          console.log(result);
          setSignInStatus({ msg: "Succes", key: Math.random() });
          navigate("/app/welcome");
          localStorage.setItem("userData", JSON.stringify(result));
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          setSignInStatus({
            msg: "Email or User Name alerady exists",
            key: Math.random(),
          });
        });
    } catch (e) {
      if (e.response.status === 405) {
        setSignInStatus({
          msg: "Email or User Name alerady exists",
          key: Math.random(),
        });
      }

      setLoading(false);
    }
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="" />
        </div>
        {showLogin && (
          <div className="login-panel">
            <p className="login-text">Login to Your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  logInHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="standard-password-input"
              label="Password"
              type="password"
              variant="outlined"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  logInHandler();
                }
              }}
            />

            <Button variant="outlined" color="secondary" onClick={logInHandler}>
              Login
            </Button>
            <p>
              Don't have an Account?{" "}
              <span
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} messsage={logInStatus.msg} />
            ) : null}
            {/* <Alert severity="success">This is a success Alert.</Alert>
          <Alert severity="info">This is an info Alert.</Alert>
          <Alert severity="warning">This is a warning Alert.</Alert>
          <Alert severity="error">This is an error Alert.</Alert> */}
          </div>
        )}
        {!showLogin && (
          <div className="login-panel">
            <p className="login-text">Create Your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  logInHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="standard-basic-email"
              label="Enter Email Address"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  logInHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="standard-password-input"
              label="Password"
              type="password"
              variant="outlined"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  logInHandler();
                }
              }}
            />

            <Button
              variant="outlined"
              color="secondary"
              onClick={signUpHandler}
            >
              Sign Up
            </Button>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                LOGIN
              </span>
            </p>
            {signInStatus ? (
              <Toaster key={signInStatus.key} messsage={signInStatus.msg} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
