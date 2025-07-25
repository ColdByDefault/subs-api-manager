import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import { authorize } from "../middelwares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({
    title: "Create a User",
  });
});

userRouter.post("/:id", (req, res) => {
  res.send({
    title: "Update one User",
  });
});

userRouter.delete("/:id", (req, res) => {
  res.send({
    title: "Delete one User",
  });
});

export default userRouter;
