import {Request, Response, Router} from "express";
const jwt = require("jsonwebtoken");
import {User} from "./userModel";
import "dotenv/config";

const router = Router();

router.post("/auth", async (req: Request, res: Response) => {
  const {email, name, imageId} = req.body;

  // Check if all required fields are provided
  if (!email || !name) {
    return res.status(400).json({error: "Email or username are required"});
  }

  try {
    let user;
    const existingUser = await User.findOneAndUpdate(
      {email},
      {isOnline: true, imageId: imageId},
      {new: true}
    );

    console.log("existingUser ----- ", existingUser);

    if (existingUser) {
      user = existingUser;
      // If email exists but the username is different, return an error
      if (existingUser.name !== name) {
        console.log("existingUser.name !== name", existingUser.name !== name);

        return res.status(400).json({
          error:
            "This email is already associated with a different username. Please use another email or username.",
        });
      } else {
        console.log("updated existing user");
      }
    } else {
      user = new User(req.body);
      await user.save();
    }
    console.log("creating accessToken ----");

    const accessToken = jwt.sign(
      user.toObject(),
      process.env.ACCESS_TOKEN_SECRET!
    );
    res.setHeader("Set-Cookie", `user=${accessToken}; Path=/`);
    res.send({
      email: user.email,
      name: user.name,
      imageId: user.imageId,
      isOnline: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const {email} = req.body;
    const existingUser = await User.findOneAndUpdate(
      {email},
      {isOnline: false},
      {new: true}
    );
    if (existingUser) {
      console.log("updated user logot -  ", existingUser);

      res.setHeader("Set-Cookie", `user=${null}; Path=/`);
      res.send("user logout");
    } else {
      throw new Error("user not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.post("/updateUser", async (req: Request, res: Response) => {
  try {
    const {email, name} = req.body;
    const existingUser = await User.findOneAndUpdate(
      {email},
      {name, email},
      {new: true}
    );
    if (existingUser) {
      console.log("updated user  -  ", existingUser);

      res.send("user updated");
    } else {
      throw new Error("user not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});
router.get("/user", async (req: Request, res: Response) => {
  try {
    const data = jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.find({email: data?.email});
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/messages", async (req: Request, res: Response) => {
  const {sender, reciver} = req.query;
  const user = await User.find({email: reciver});
  const filteredUser = user[0]?.messages?.filter(
    (message: any) =>
      (message.sender === sender && message.reciver === reciver) ||
      (message.sender === reciver && message.reciver === sender)
  );
  res.send(filteredUser);
});

export default router;
