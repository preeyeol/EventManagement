const eventSchema= require("../model/eventSchema");
const userSchema=require("../model/userSchema");

const createEvent= async (req ,res)=>{

try{const {name,description,date,location,maxAttendees}=req.body;

const event= await new eventSchema({
    name:name,
    description:description,
    date:date,
    location:location,
    maxAttendees:maxAttendees
});

const newEvent= await event.save();

res.status(200).json({
    msg:"Event Created",
    event: newEvent
})}catch(err){
    res.status(401).json({Msg:"Server error"})
}

}



const joinEvent = async (req, res) => {
    try {
      const { maxAttendees } = req.body;
      const user = req.user;
      const eventId = req.params.id;
  
      const event = await eventSchema.findById(eventId);
      if (!event) {
        return res.status(404).json({ msg: "Event cancelled or doesn't exist" });
      }
 
      if (event.attendees.length >= maxAttendees) {
        return res.status(400).json({ msg: "Event is fully booked" });
      }
  
      if (event.attendees.includes(user.id)) {
        return res.status(400).json({ msg: "You have already joined this event" });
      }

      event.attendees.push(user.id);
  
      await event.save();
  
      res.json({ msg: "Event attended" });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  };
  
module.exports={createEvent,joinEvent}