const express = require("express");

const router = express.Router();

const userService = require("../grpc/user.js");
const auth = require("../middlewares/auth.js");

router.post("/register", (req, res) => {
  userService
    .register(req.body)
    .then(() => {
      res.status(200).json({ msg: "registration successful" });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ msg: "failed to register user" });
    });
});

router.get("/profile", auth, (req, res) => {
  userService
    .profile(req.token)
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((error) => {
      console.error(error);
      res.status(401).json({ msg: "failed to get user profile" });
    });
});

module.exports = router;
