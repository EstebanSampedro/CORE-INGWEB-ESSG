import express from "express";
import { countByCity, countByType, createHospital, deleteHospital, getHospital, getHospitalRooms, getHospitals, updateHospital } from "../controllers/hospital.js";
import Hospital from "../models/Hospital.js";
import {verifyAdmin} from "../utils/verifyToken.js"
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

export default router;
