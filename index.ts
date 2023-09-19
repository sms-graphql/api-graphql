import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import database from './database';

var schema = buildSchema(
  `
  type Query {
    hello: String
  }
  `
)

var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    context: { database },
    graphiql: true,
  })
)

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")