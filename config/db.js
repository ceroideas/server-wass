const mongoose = require("mongoose");

const dbURI = "mongodb+srv://dev:Dev*4891@cluster0-kq0xj.mongodb.net/test?retryWrites=true";
// const dbURI = "mongodb+srv://jorgesolano92:j7934748901@cluster0-ydnzk.mongodb.net/test?retryWrites=true&w=majority";

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models