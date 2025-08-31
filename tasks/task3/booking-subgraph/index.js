import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { getBookingsByUserId } from './bookingService.js';
import { GraphQLError } from 'graphql';

const typeDefs = gql`
  type Booking @key(fields: "id") {
    id: ID!
    userId: String!
    hotel: Hotel!
    price: Int
    promoCode: String
    discountPercent: Int
  }

  type Hotel @key(fields: "id") {
    id: ID!
  }

  type Query {
    bookingsByUser(userId: String!): [Booking]
  }

`;

function mapBookingGrpcModelToGraphQl(booking) {
  return {
    id: booking.id,
    userId: booking.user_id,
    hotel: {
      id: booking.hotel_id,
    },
    price: booking.price,
    discountPercent: booking.discount_percent,
    promoCode: booking.promo_code,
  }
}

const resolvers = {
  Query: {
    bookingsByUser: async (_, { userId }, { req }) => {
      const currentUserId = req.headers.userid;

      // Fast fallback when non authenticated
      if (currentUserId !== userId) {
        console.warn(`User ${currentUserId} is not authenticated to access bookings for user ${userId}`);
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
        });
      }

      const bookings = await getBookingsByUserId(userId);

      return bookings
        .filter(booking => booking.user_id === userId)
        .map(mapBookingGrpcModelToGraphQl);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req }) => ({ req }),
}).then(() => {
  console.log('✅ Booking subgraph ready at http://localhost:4001/');
});
