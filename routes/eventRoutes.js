const express=require("express");
const eventRoute=express.Router();
const {createEvent,joinEvent,leave,getAllEvents}=require("../controller/eventController")
const {verifyToken,authorizeTo}=require("../middleware/authentication");


eventRoute.post("/",verifyToken,authorizeTo("organizer"),createEvent)

eventRoute.post("/:id/join",verifyToken,authorizeTo("attendee"),joinEvent)
 eventRoute.post("/:id/leave",verifyToken,authorizeTo("attendee"),leave)
 eventRoute.get("/",verifyToken,getAllEvents)

module.exports=eventRoute;