"use strict";
exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://thebrogrammers:tjdzR6tq3euumH3Up6YE@cluster0-shard-00-00-o4har.mongodb.net:27017,cluster0-shard-00-01-o4har.mongodb.net:27017,cluster0-shard-00-02-o4har.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/jwt-auth-demo";
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
exports.GOOGLE_KEY = process.env.GEO_KEY;
