const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const env = require("./environment");
mongoose.connect(
  `mongodb+srv://harish:harish123@cluster0.0qpeyqk.mongodb.net/${env.db}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// mongoose.connect('mongodb+srv://harish:harish123@cluster0.0qpeyqk.mongodb.net/codeial_development',{ useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
