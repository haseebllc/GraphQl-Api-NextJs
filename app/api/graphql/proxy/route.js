// app/api/graphql/proxy/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = await fetch("http://localhost:3000/api/graphql/endpoint", {
      method: req.method,
      headers: {
        ...req.headers,
        "x-api-key": process.env.API_KEY,
        "Content-Type": "application/json",
      },
      body: req.body,
      duplex: "half",
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error forwarding the request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
