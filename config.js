"use strict";
exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb://dev:a123412@ds133275.mlab.com:33275/helpful";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/jwt-auth-demo";
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
