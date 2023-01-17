const httpStatus = require("http-status");

// MIDDLWARE
const { ApiError } = require("../middleware/apiError");

// MODELS
const { User } = require("../models/user");

// SERVICES
const userService = require("./user.service");

// FUNCTIONS
const createUser = async (email, password) => {
  try {
    // check if the email exists
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }

    const user = new User({
      email,
      password,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = async (user) => {
  const token = user.generateAuthToken();
  return token;
};

const loginUser = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email");
    }
    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Bad password");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  loginUser,
};
