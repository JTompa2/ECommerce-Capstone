const userModel = require("../model/usersModel");
const SECRET_KEY = "Ecommerce";
const jwt = require("jsonwebtoken");

// Signup fucntion
const signup = async (req, res) => {
  try {
    let { username, email, password, confirmPassword, phone, org, eid } =
      req.body;
    let file = req.file;
    let imagePath = file.destination + "/" + file.filename;
    let newUser = await userModel.create({
      name: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
      orgName: org,
      eid: eid,
      eidpic: imagePath.substring(6),
    });
    const token = jwt.sign({ id: newUser["_id"] }, SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true });

    res.status(201).json({
      message: "Signed up succesfully !!",
      data: newUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to sign up !!",
      error,
    });
  }
};

// Login Fucntion
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.find({ email: email });
    if (user.length) {
      user = user[0];
      if (user.password == password) {
        const token = jwt.sign({ id: user["_id"] }, SECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
          message: "Logged in succesfully !!",
          data: user,
        });
      } else {
        res.status(200).json({
          message: "Either email or password is incorrect !!",
        });
      }
    } else {
      res.status(200).json({
        message: "No user with this email found !!",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "login Failed ",
      error,
    });
  }
};

// Logout function
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logged out succesfully !!",
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to logout !!",
      error,
    });
  }
};

// Check whether it's logged in or not
const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
      let userData = await userModel.findById(payload.id);
      req.name = userData.name;
      req.role = userData.role;
      req.user = userData;
      next();
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

// Protect Route
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
      req.id = payload.id;
      next();
    } else {
      res.status(501).json({
        message: "Please Log in ",
      });
    }
  } catch (error) {
    res.status(501).json({
      message: "Please Log in",
      error,
    });
  }
};


// to check whether the user is admin or not
const isAuthorized = (req, res, next) => {
  try {
    let role = req.user.role;
    if (role == "admin") {
      next();
    } else {
      res.status(200).json({
        message: "Admin rights required !!",
      });
    }
  }catch{
    res.status(501).json({
      message: "Unable to Authorize",
      error,
    });
  }
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.logout = logout;
module.exports.protectRoute = protectRoute;
module.exports.isAuthorized = isAuthorized;
module.exports.isLoggedIn = isLoggedIn;
