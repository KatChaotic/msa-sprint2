import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';

const BOOKING_GRAPHQL_ENDPOINT = process.env.BOOKING_GRAPHQL_ENDPOINT || 'http://localhost:4001';
const HOTEL_GRAPHQL_ENDPOINT = process.env.HOTEL_GRAPHQL_ENDPOINT || 'http://localhost:4002';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('userid', context.userId);
  }
}

const gateway = new ApolloGateway({
  buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
  serviceList: [
    { name: 'booking', url: BOOKING_GRAPHQL_ENDPOINT },
    { name: 'hotel', url: HOTEL_GRAPHQL_ENDPOINT }
  ]
});

const server = new ApolloServer({ gateway, subscriptions: false });

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const userId = req.headers.userid;
    return ({ userId });
  }, // headers пробрасываются
}).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
