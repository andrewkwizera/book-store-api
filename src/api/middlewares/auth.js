const { Unauthorized } = require("http-errors");

const asyncHandler = require("./async");
const User = require("../../models/users");

// Protect routes
const authenticate = async (req, res, next) => {
  if(!req.session || !req.session.user) throw new Unauthorized('user not logged in')
  req.user = req.session.user
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
