const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not authorised." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = { userId: decode.userId }; // attach user id
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Auth failed" });
  }
};

module.exports = { isAuth };
