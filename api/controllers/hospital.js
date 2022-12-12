import Hospital from "../models/Hospital.js";
import Room from "../models/Room.js";

export const createHospital = async (req, res, next) => {
    const newHospital = new Hospital(req.body)
    try {
        const savedHospital = await newHospital.save();
        res.status(200).json(savedHospital);
    } catch (err) {
        next(err);
    }
};

export const updateHospital = async (req, res, next) => {
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHospital);
    } catch (err) {
        next(err);
    }
};

export const deleteHospital = async (req, res, next) => {
    try {
        await Hospital.findByIdAndDelete(req.params.id);
        res.status(200).json("Hospital eliminado!");
    } catch (err) {
        next(err);
    }
};

export const getHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        res.status(200).json(hospital);
    } catch (err) {
        next(err);
    }
};

export const getHospitals = async (req, res, next) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (err) {
        next(err);
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hospital.countDocuments({city:city})
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const hospitalCount = await Hospital.countDocuments({ type: "hospital" });
        const clinicaCount = await Hospital.countDocuments({ type: "clinica" });
        const sanatorioCount = await Hospital.countDocuments({ type: "sanatorio" });

        res.status(200).json([
          { type: "hospital", count: hospitalCount },
          { type: "clinica", count: clinicaCount },
          { type: "sanatorio", count: sanatorioCount },
        ]);
      } catch (err) {
        next(err);
      }
};




export const getHospitalRooms = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    const list = await Promise.all(
      hospital.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
