import express from "express";
import { protect, authorizeUser } from "../middleware/auth.js";
const router = express.Router();
import {
  getUsers,
  createUser,
  loginUser,
  deleteUser,
} from "../controllers/usersController.js";

//get all users route
router.route("/").get(getUsers);

//create user
router.route("/register").post(createUser);

//login user
router.route("/login").post(loginUser);

//delete user
router
  .route("/delete/:id")
  .delete(protect, authorizeUser(["admin"]), deleteUser);

export default router;
