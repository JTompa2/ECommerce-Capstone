const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const crypto = require("crypto");


mongoose
  .connect("mongodb+srv://omprarox:commerce@1234@ecommerce.fjyzrrx.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to usersModel");
  });

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be greater than 6 characters"],
    required: true,
  },
  confirmPassword: {
    type: String,
    minlength: [6, "Password must be greater than 6 characters"],
    validate: {
      validator: function () {
        return this.password == this.confirmPassword;
      },
      message: "Password and confirm password must be same",
    },
  },
  role: {
    type: String,
    default: "user",
  },
  pImage: {
    type: String,
    default: "/images/users/Avatar07.png",
  },
  phone: {
    type: String,
    required: true,
  },
  orgName: {
    type: String,
    required: true,
  },
  eid: {
    type: String,
    required: true,
  },
  eidpic: {
    type: String,
    required: true,
  },
});

// it will run before create is called on userModel
userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

const userModel = mongoose.model("userscollection", userSchema);
module.exports = userModel;
