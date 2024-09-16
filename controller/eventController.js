const eventSchema = require("../model/eventSchema");

const createEvent = async (req, res) => {
  try {
    const { name, description, date, location, maxAttendees } = req.body;
    const user = req.user;

    const event = await new eventSchema({
      name: name,
      description: description,
      date: date,
      location: location,
      maxAttendees: maxAttendees,
      organizer: user._id,
    });

    const newEvent = await event.save();

    res.status(200).json({
      msg: "Event Created",
      event: newEvent,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ Msg: "Server error" });
  }
};

const joinEvent = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.id;

    const event = await eventSchema.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event cancelled or doesn't exist" });
    }

    if (event.maxAttendees === event.attendees.length) {
      return res.status(400).json({
        msg: " Event packed",
      });
    }

    if (event.attendees.includes(user._id)) {
      return res
        .status(400)
        .json({ msg: "You have already joined this event" });
    }

    event.attendees.push(user._id);

    await event.save();

    res.json({ msg: "Event attended" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
const leave = async (req, res) => {
  try {
    const user = req.user;
    const eventId = req.params.id;

    const event = await eventSchema.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event cancelled or doesn't exist" });
    }

    if (!event.attendees.includes(user._id)) {
      return res.status(400).json({ msg: "You are not part of this event" });
    }

    const remainingAttendees = event.attendees.filter(
      (attendeeId) => attendeeId !== user._id
    );
    event.attendees = remainingAttendees;

    await event.save();

    res.json({ msg: "You have left the event" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getAllEvents = async (req, res) => {
  const eventAll = await eventSchema
    .find({})
    .populate({ path: "attendees organizer", select: "username email" });
  res.json({ msg: "Events", eventAll });
};

const aggregateEvent = async (req, res) => {
  const events = await eventSchema.aggregate([
    {
      $project: {
        totalAttentees: {
          $size: "$attendees",
        }
      },
     
    },
  ]);
 const eventsByOrganizer = await eventSchema.aggregate([
    {
      $group:{
        _id:"$organizer",
        totalEvent:{
          $sum:1
        }
      }
    }
  ])
 res.json({
  totalEvent:events.length,
  totalAttentees:events,
  eventsByOrganizer:eventsByOrganizer
 })

  // const events=await eventSchema.find()

};
module.exports = { createEvent, joinEvent, leave,getAllEvents,aggregateEvent};