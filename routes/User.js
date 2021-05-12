const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/User");

userRouter.get("/", UserController.welcome);
userRouter.get("/user/all", UserController.getAllUSers);
userRouter.get("/user/:name", UserController.getUserByName);
userRouter.post("/add", UserController.addUser);
userRouter.put("/update/:id", UserController.updateUser);
userRouter.delete("/delete/:name", UserController.deleteUser);

module.exports = userRouter;
