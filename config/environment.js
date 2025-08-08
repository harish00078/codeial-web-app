const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

// Load environment variables from .env if present
try {
  require("dotenv").config();
} catch (e) {
  // dotenv is optional; ignore if unavailable
}

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// .createStream
const accessLogStream = rfs("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "hk313665@gmail.com",
      pass: "macgnpblfzjssxnw",
    },
  },
  google_client_id: "289203943405-pbn6uhs3a6d7ab3f0bsq6ftm8k77vomd.apps.googleusercontent.com",
  google_client_secret:"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",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
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
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

// Validate critical environment in production early with clear messages
if (process.env.NODE_ENV === "production") {
  if (!process.env.CODEIAL_JWT_SECRET) {
    throw new Error(
      "CODEIAL_JWT_SECRET is not set. Set it in your environment or .env before starting in production."
    );
  }
}

module.exports = process.env.NODE_ENV === 'production' ? production : development;
