const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb+srv://omprarox:commerce@1234@ecommerce.fjyzrrx.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to dishesModel");
  });

let dishesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Amount: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    default: "/images/users/Avatar07.png",
    required: true,
  },
  Details: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
});

const dishesModel = mongoose.model("dishesSchema", dishesSchema);
module.exports = dishesModel;
