import React from 'react'

function SignUp() {
    return (
        <div className="login-container">
          <div className="image-container">
            <img src={logo} alt="" />
          </div>
          <div className="login-panel">
            <p className="login-text">Create Your Account</p>
            <TextField
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
            />
             <TextField
              id="standard-basic"
              label="Enter Email Address"
              variant="outlined"
              color="secondary"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="outlined"
              color="secondary"
            />
    
            <Button variant="outlined" color="secondary">SIGN UP</Button>
            <div>
                <p>Already have an Account? <a >Login</a></p> 
            </div>
          </div>
        </div>
      );
}

export default SignUp
