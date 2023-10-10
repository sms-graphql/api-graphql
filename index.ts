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
    cookie: { maxAge: 60000, secure: false }
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

app.use('/login', (req, res) => {
  req.session.user = { name: 'Spyl' };
  res.send('Bienvenue Spyl ! <a href="/graphql">Retourner sur GraphiQL.</a>');
});

app.use('/logout', (req, res) => {
  req.session.destroy(() => { });
  res.send('Aurevoir ! <a href="/graphql">Retourner sur GraphiQL.</a>');
});

app.use('/', (_, res) => {
  res.send(`
    <a href="/graphql">GraphiQL</a>
    <a href="/login">Login</a>
    <a href="/logout">Logout</a>
  `);
});

app.listen(4000);
console.log('Running index at http://localhost:4000/');
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
