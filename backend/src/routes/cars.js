import express from "express";
const router = express.Router();

import { addCar, getCarByCategory, getCarByColor, getAllCars, updateCar, deleteCar, deleteCategory, getCarByReg } from '../controllers/CarController/carController.js'

//Create
router.post("/cars/addCar", addCar);

//Read
router.get("/cars/getCarByCategory", getCarByCategory)
router.get("/cars/getCarByColor", getCarByColor)
router.get("/cars/getAllCars", getAllCars)
router.get("/cars/getCarByReg", getCarByReg)


//Update
router.post("/cars/updateCar/:registrationNo", updateCar)

//Delete
router.delete("/cars/deleteCar/:registrationNo", deleteCar)
router.delete("/cars/deleteCategory/:category", deleteCategory)

export default router;