const mongoose = require("mongoose");

const dbURI = "mongodb+srv://dev:Dev*4891@cluster0-kq0xj.mongodb.net/test?retryWrites=true";

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