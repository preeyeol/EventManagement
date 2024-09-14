const express=require("express");
const userRoute=express.Router();

const {register,login,getAllUsers,adminUpdate}= require("../controller/userController");
const {verifyToken,authorizeTo}=require("../middleware/authentication");



userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.get("/users",verifyToken,authorizeTo,getAllUsers)
userRoute.patch("/users/:id/role",verifyToken,authorizeTo("admin"),adminUpdate)


module.exports= userRoute;