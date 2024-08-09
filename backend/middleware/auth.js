const usermodel = require("../baseconnect");
const jsonwebtoken = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    console.log("isAuthenticated func run!", req.cookies);
    const { token } = req.cookies;
    console.log("token is", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to countinue",
        result: "Please login to countinue",
      });
    }
    const decoded = await jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    console.log("decoed result is:", decoded);
    req.user = await usermodel.findById(decoded.id);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      result: "please Login to Countinue",
      message: error.message,
      error,
    });
  }
};
