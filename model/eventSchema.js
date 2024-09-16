const mongoose=require("mongoose");

const event=  {
    name: {type:String,required:true},
    description: {type:String,required:true},
    date:{ type:Date,default:new Date},
    location: {type:String,required:true},
    maxAttendees: {type:Number,required:true},
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  };

 const eventSchema= mongoose.model("event",event);

 module.exports=eventSchema ;