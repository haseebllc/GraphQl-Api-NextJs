import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

export const validateKey = (req) => {
  const API_KEY = process.env.API_KEY;
  const apiKeyHeader = req.headers.get("x-api-key");

  console.log("Environment API Key:", API_KEY);
  console.log("Request API Key Header:", apiKeyHeader);

  if (!apiKeyHeader || apiKeyHeader !== API_KEY) {
    console.error("Invalid API Key or API Key missing");
    return false;
  }
  return true;
};

// authenticate JWT
export const authenticateJWT = () => {
  const token = localStorage.getItem("token");

  if (!token)
    return NextResponse.json(
      { message: "Unauthorized: No token provided or invalid" },
      { status: 403 }
    );

  jwt.verify(token, process.env.JWT_SECRET, (err, userToken) => {
    if (err) {
      console.error(err);
      return err;
    }
    return userToken;
  });
};

// generate JWT token
export const generateToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: "1h" });
};
