// pages/api/graphql/route.js

import { NextResponse } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "./schema";
import { validateKey } from "../utilities/auth";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  introspection: true, // Enable introspection for development mode
});

const handler = startServerAndCreateNextHandler(server);

export const POST = async (req) => {
  const isValidKey = validateKey(req);

  if (!isValidKey) {
    return NextResponse.json(
      { error: "Forbidden: Invalid API key." },
      { status: 403 }
    );
  }
  return handler(req);
};

export const GET = async (req) => {
  const isValidKey = validateKey(req);

  if (!isValidKey) {
    return NextResponse.json(
      { error: "Forbidden: Invalid API key." },
      { status: 403 }
    );
  }

  return handler(req);
};
