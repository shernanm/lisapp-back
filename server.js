const { ApolloServer } = require('apollo-server'),
  logger = require('./app/logger'),
  schema = require('./app/graphql');

const server = new ApolloServer({ schema, introspection: true, playground: true, cors: true });

server.listen({ port: process.env.PORT || 8080 }).then(({ url, subscriptionsUrl }) => {
  logger.info(`🚀 Server ready at ${url}`);
  logger.info(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
