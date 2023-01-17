const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { ApiError } = require("../middleware/ApiError");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (_id) => {
  return await User.findById(_id).select("-password");
};

const updateUserProfile = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
        },
      },
      { new: true }
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserEmail = async (req) => {
  try {
    // check if email is already taken
    if (await User.emailTaken(req.body.newemail)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }

    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        email: req.user.email,
      },
      {
        $set: {
          email: req.body.newemail,
          verified: false,
        },
      },
      { new: true }
    );

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
  validateToken,
};
