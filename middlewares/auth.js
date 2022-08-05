const { Unauthorized } = require("http-errors");

const asyncHandler = require("./async");
const User = require("../models/users");

// Protect routes
const authenticate = async (req, res, next) => {
  if(!req.session || !req.session.user) throw new Unauthorized('user not logged in')
  const user = await User.findOne({ _id: req.session.user.id });
  if (!user) throw new Unauthorized("please login");
  if(!user.active) throw new Unauthorized('activate your account first')
  req.user = user 
  next()
};


const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Unauthorized(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
