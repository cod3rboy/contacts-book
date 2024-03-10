function auth(req, res, next) {
  const authorization = req.header("Authorization") ?? "";
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ msg: "unauthorized" });
    return;
  }
  req.token = authorization.split(" ")[1];
  next();
}

module.exports = auth;
