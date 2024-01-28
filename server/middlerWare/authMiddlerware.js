const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protect = expressAsyncHandler(async (req, res, next)=>{
console.log('====================================');
console.log(req.headers.authorization);
console.log('====================================');
    let token;
    if(req.headers.authorization &&
       req.headers.authorization.startsWith("Bearer")){
       try{
        token = req.headers.authorization.split(" ")[1];
        console.log(token);

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id).select("-password");
        next();
       }catch(error){
        res.status(401);
        throw new Error("User is not authorized");
       }
    }
})
module.exports = {protect};