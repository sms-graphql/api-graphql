import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import session from 'express-session';
import database from './database';
import schema from './schema';

declare module 'express-session' {
  interface SessionData {
    user: { name: string };
  }
}

var app = express();

app.use(
  session({
    secret: 'A super secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60, secure: false }
  })
);

const buildContext = (req: any) => {
  let user: any = null
  if (req.session && req.session.user) {
    user = req.session.user;
  }

  return { req, user, database };
};

app.use(
  '/graphql',
  graphqlHTTP(request => ({
    schema,
    context: buildContext(request),
    graphiql: true
  }))
);

app.listen(4000);
console.log('Running index at http://localhost:4000/');
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
