"use client";

import "./globals.css";
import classNames from "classnames";

import { ApolloProvider } from "@apollo/client";
import client from "./apollo/apolloClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames("body")}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
