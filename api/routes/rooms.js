import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability,} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hospitalid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hospitalid", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;