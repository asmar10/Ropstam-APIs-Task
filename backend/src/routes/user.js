import express from "express";
const router = express.Router();
import { getMessage, signIn, signUp, verifySignature, verifyToken } from '../controllers/UserController/userController.js'

//Create user
router.post("/users/signup", signUp);

//Login user
router.post("/users/login", signIn)

//Verify Signature
router.post("/users/verifySignature", verifySignature);
router.get("/users/getMessage", getMessage)
router.post("/users/verifySignature", verifySignature)
router.post("/users/verifyToken", verifyToken)



export default router;
