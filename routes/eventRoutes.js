const express=require("express");
const eventRoute=express.Router();
const {createEvent,joinEvent}=require("../controller/eventController")
const {verifyToken,authorizeTo}=require("../middleware/authentication");


eventRoute.post("/",verifyToken,authorizeTo("organizer"),createEvent)

eventRoute.post("/:id/join",verifyToken,authorizeTo("attendee"),joinEvent)



module.exports=eventRoute;