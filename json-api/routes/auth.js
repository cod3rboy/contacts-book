const express = require("express");

const router = express.Router();
const authService = require("../grpc/auth.js");
const auth = require("../middlewares/auth.js");

router.post("/login", (req, res) => {
  authService
    .login(req.body)
    .then((accessGrant) => {
      res.status(200).json(accessGrant);
    })
    .catch((error) => {
      console.error("failed to login: ", error);
      res.status(403).json({ msg: "incorrect credentials" });
    });
});

router.post("/logout", auth, (req, res) => {
  authService
    .logout(req.token)
    .then(() => {
      res.status(200).json({ msg: "logout successful" });
    })
    .catch((error) => {
      console.error("failed to logout: ", error);
      res.status(500).json({ msg: "internal error" });
    });
});

module.exports = router;
