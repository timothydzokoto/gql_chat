import { ApolloServer } from "apollo-server";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

import { PrismaClient } from "@prisma/client";
import { Context } from "context";
import { auth } from "./middleware/auth";

const runServer = () => {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }): Context => {
      const token = req?.headers?.authorization
        ? auth(req.headers.authorization)
        : null;
      return {
        prisma,
        userId: token?.userId,
      };
    },
  });

  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

runServer();
