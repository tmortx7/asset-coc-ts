import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { createTypeormConn } from "./createTypeormConn";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";

TypeORM.useContainer(Container);

const main = async (): Promise<void> => {
  await createTypeormConn();

  const app = express();
  // @ts-ignore
  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: process.env.REDIS_HOST,
  });
  app.use(
    cors({
      origin: process.env.CORS_URL,
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      // @ts-ignore
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "process.env.SESSION_SECRET",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/resolver.*"],
      container: Container,
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
     plugins: [
    ApolloServerLoaderPlugin({
      typeormGetConnection: getConnection,  // for use with TypeORM
    }),
  ],
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
