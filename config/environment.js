// here we setup our environments:
// here we import (fs):
const fs = require('fs');
// here we are import the rotating-file-stream library:
const rfs = require('rotating-file-stream');
// here we are importing the (path) library:
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log',{
  interval:'1d',
  path:logDirectory
});



// 1. development environment:
// here we create the development-object:
// In which we will add our all the data related to the development environment:
// means that the current things.which we are using to run our application:
const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "stmp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "hk313665@gmail.com",
      pass: "macgnpblfzjssxnw",
    },
  },
  google_client_id:
    "289203943405-pbn6uhs3a6d7ab3f0bsq6ftm8k77vomd.apps.googleusercontent.com",
  google_client_secret: "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",
  // google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  google_call_back_url: "http://codeial-app.click/users/auth/google/callback",

  jwt_secret:'codeial',
  morgan:{
    mode:'dev',
    options:{stream:accessLogStream}
  }
};

// 2. production environment:
// same as above, but for the production environment.
// here we setup our environments. acc to the production verison of our application:
const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  // asset_path: '../public/assets',

  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan:{
    mode:'combined',
    options:{stream:accessLogStream}
  }
};

// we want to export the particular environment.acc to the mode on which we are running our application:
// here we are doing that.if the environment is (undefined) then we need to use the (development) mode:
// if its (defined). then we need to use the (defined) environment:
module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
// here we are exporting our the environments from this file:
// module.exports = development;


