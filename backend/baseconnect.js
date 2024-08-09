const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://goffood:gofood@cluster0.qlkoag7.mongodb.net/aichatboat?retryWrites=true&w=majority&appName=Cluster0"
);

//check db connection
connect
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("not-connected");
    console.log("here is the error", error);
  });

//schema
const SignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("users", SignupSchema);

module.exports = collection;
