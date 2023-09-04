const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    dob: req.body.dob,
    username: req.body.username,
    password: req.body.password
  };
  User
    .create(newUser)
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while Post",
      });
    });
});

exports.profileGet = (req, res) => {
  User
    .find({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving",
      });
    });
};

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ username }).select("+password");
  console.log(user)

  if (!user || !(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  req.session.userId = user._id.toString();
  req.session.email = user.email;
  req.session.isLoggedIn = true;
  req.session.save((err) => {
    if (err) {
      console.error("Error saving session:", err);
      res.status(400).json({ success: false });
    } else {
      res.status(200).send(user);
    }
  });
});

exports.logoutUser = (req, res, next) => {
  // req.session
  //   .destroy((err) => {
  //     if (err) {
  //       return res.status(500).send("Internal Server Error");
  //     }
  //   })
  res.status(200)
    .json({
      success: true,
      message: "Loggedout",
    });
};
