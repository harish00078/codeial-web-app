const mongoose = require("mongoose");

// here we import the env-file:
const env = require('./environment').default;
// mongoose.connect('mongodb://localhost/codeial_development');
mongoose.connect(
  `mongodb+srv://harish:harish123@cluster0.0qpeyqk.mongodb.net/${env.db}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
