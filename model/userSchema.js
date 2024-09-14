const mongoose=require("mongoose");

const user=mongoose.Schema({
    username:{type:String,require:true},
    email: {type:String,require:true,unique:true},
    password: {type:String,require:true,select:false},
    confirmPassword:{type:String},
    role: {
      type: String,
      enum: ["admin", "organizer", "attendee"],
      default: "attendee",
    },

});

const userSchema= mongoose.model("user",user);

module.exports= userSchema ;
