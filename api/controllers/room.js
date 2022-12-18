import Room from "../models/Room.js";
import Hospital from "../models/Hospital.js";



export const createRoom = async (req, res, next) => {
  const hospitalId = req.params.hospitalid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hospital.findByIdAndUpdate(hospitalId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status ha sido actualizado.");
  } catch (err) {
    next(err);
  }
};


export const deleteRoom = async (req, res, next) => {
  const hospitalId = req.params.hospitalid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hospital.findByIdAndUpdate(hospitalId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room ha sido eliminado.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const countByDateRoom = async (req, res, next) => {
  const roomsDate = req.query.rooms.dates
  try {
    const list = await Promise.all(roomsDate.map(title => {
      return Room.countDocuments({ title: title })
    }))
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByReserva = async (req, res, next) => {
  try {
    await Room.count(
      { "roomNumbers._id": req.params.id },
      {
        "roomNumbers.$.unavailableDates": req.body.dates
      }
    );
    res.status(200).json("Room cont.");
  } catch (err) {
    next(err);
  }
};



export const getMostReservedRooms = async (req, res, next) => {
  const hospitalId = req.params.hospitalid;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const mongoose = require("mongoose");
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const rooms = await Room.aggregate([
      // match rooms that belong to the specified hospital
      { $match: { hospital: hospitalId } },
      // unwind the roomNumbers array
      { $unwind: "$roomNumbers" },
      // match roomNumbers that have at least one unavailable date within the specified time range
      {
        $match: {
          "roomNumbers.unavailableDates": {
            $elemMatch: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
      },
      // group by room id and count the number of unavailable dates per room
      {
        $group: {
          _id: "$_id",
          count: { $sum: { $size: "$roomNumbers.unavailableDates" } },
        },
      },
      // sort the rooms by the number of unavailable dates in descending order
      { $sort: { count: -1 } },
    ]);

    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
