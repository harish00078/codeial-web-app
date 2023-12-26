const express = require("express");
// here we are importing our environment file:
const env = require("./config/environment");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie handler:
const session = require("express-session");
// authentication handlers:
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
// session-cookie hanlders in database:
const MongoStore = require("connect-mongo")(session);
// style handlers:
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// chat-server handlers or its connection with application:
// setup the chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

// here we are importing the (path) library:In our application so that we can use the path functionality in our application:
const path = require("path");

// style-middleware handler:and its connection with application:
app.use(
  sassMiddleware({
    // here we are giving the directiory to the sassmiddleware.
    // with the help of (path) library:
    src: path.join(__dirname, env.asset_path, "/scss"),
    dest: path.join(__dirname, env.asset_path, "/css"),
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

// url-encode handler:and its connection with application:
app.use(express.urlencoded());
// cookie-parser handler:and its connection with application:
app.use(cookieParser());

// here we are accessing the value of the (asset_path) from the environment-file:
app.use(express.static(env.asset_path));
// make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// here we connect the layout library:with  our application:
app.use(expressLayouts);

// style and script files layout handler in the application pages:
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// view-engine handler:
// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// session-creatation handler:
// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// connecting the authentication with the application:
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// notification library connection with application:
app.use(flash());
app.use(customMware.setFlash);

// created routes connection with the application:
// use express router
app.use("/", require("./routes"));

// port-listener for the application:
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
