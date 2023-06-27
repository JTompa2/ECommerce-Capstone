const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb+srv://omprarox:commerce@1234@ecommerce.fjyzrrx.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to pendingOrderModel");
  });

let OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dishes: {
    type: String,
    required: true,
  },
});

const OrdereModel = mongoose.model("OrderSchema", OrderSchema);
module.exports = OrdereModel;
