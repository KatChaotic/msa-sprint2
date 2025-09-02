import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { getHotelById } from './hotelService.js';

const typeDefs = gql`
  type Hotel @key(fields: "id") {
    id: ID!
    name: String
    city: String
    stars: Int
  }

  type Query {
    hotelsByIds(ids: [ID!]!): [Hotel]
  }
`;

function convertIdToName(id) {
  return id.replace(/[-]+/g, ' ')
    .split(' ')
    .map(word => {
      if (word.length === 1) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function mapHotelApiModelToGraphQl(hotel) {
  return {
    id: hotel.id,
    name: hotel.name ?? convertIdToName(hotel.id),
    city: hotel.city,
    stars: Math.floor(hotel.rating),
  };
}

const resolvers = {
  Hotel: {
    __resolveReference: async ({ id }) => {
      const hotel = await getHotelById(id);
      if (!hotel) {
        return null;
      }

      return mapHotelApiModelToGraphQl(hotel);
    },
  },
  Query: {
    hotelsByIds: async (_, { ids }) => {
      const hotels = await Promise.all(ids.map(id => getHotelById(id)));

      return hotels.filter(Boolean).map(mapHotelApiModelToGraphQl);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(() => {
  console.log('✅ Hotel subgraph ready at http://localhost:4002/');
});
