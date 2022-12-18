
import { countByCity, countByType, createHospital, deleteHospital, getHospital, getHospitalRooms, getHospitals, updateHospital } from "../controllers/hospital.js";
import Hospital from "../models/Hospital.js";
import express from "express";
import Room from "../models/Room.js";
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createHospital);

//UPDATE
router.put("/:id", verifyAdmin, updateHospital);
//DELETE
router.delete("/:id", verifyAdmin, deleteHospital);
//GET

router.get("/find/:id", getHospital);


//GET ALL
router.get("/", getHospitals);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHospitalRooms);


router.get("/report", async (req, res, next) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    // Query the Room model to find all rooms booked between the given dates
    const rooms = await Room.find({
      "roomNumbers.unavailableDates": {
        $gte: startDate,
        $lt: endDate,
      },
    });

    // Aggregate the data by hospital and room number
    const report = rooms.reduce((acc, room) => {
      const hospital = room.title;
      const roomNumber = room.roomNumbers;
      if (hospital in acc) {
        if (roomNumber in acc[hospital]) {
          acc[hospital][roomNumber]++;
        } else {
          acc[hospital][roomNumber] = 1;
        }
      } else {
        acc[hospital] = {};
        acc[hospital][roomNumber] = 1;
      }
      return acc;
    }, {});

    // Sort the data by hospital and room number
    const sortedReport = Object.entries(report).map(([hospital, data]) => {
      const sortedData = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([number, count]) => ({ number, count }));
      return { hospital, rooms: sortedData };
    });

    res.status(200).json(sortedReport);
  } catch (err) {
    next(err);
  }
});



router.get("/report2", async (req, res, next) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    // Query the Room model to find all rooms booked between the given dates
    const rooms = await Room.find({
      "roomNumbers.unavailableDates": {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const report = rooms.reduce((acc, room) => {
      const hospital = room.title;
      room.roomNumbers.forEach(roomNumber => {
        const count = roomNumber.unavailableDates.reduce((acc, date) => {
          if (date >= startDate && date < endDate) {
            acc++;
          }
          return acc;
        }, 0);
        if (hospital in acc) {
          if (roomNumber.number in acc[hospital]) {
            acc[hospital][roomNumber.number] += count;
          } else {
            acc[hospital][roomNumber.number] = count;
          }
        } else {
          acc[hospital] = {};
          acc[hospital][roomNumber.number] = count;
        }
      });
      return acc;
    }, {});

    // Sort the data by hospital and room number
    const sortedReport = Object.entries(report).map(([hospital, data]) => {
      const sortedData = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([number, count]) => ({ number, count }));
      return { hospital, rooms: sortedData };
    });

    res.status(200).json(sortedReport);
  } catch (err) {
    next(err);
  }
});


export default router;


