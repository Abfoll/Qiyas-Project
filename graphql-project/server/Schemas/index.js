const graphql = require("graphql");
const users = require("../MOCK_DATA.json");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve: () => users,
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users,
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => users.find((user) => user.id === args.id),
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const user = {
          id: users.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        };

        users.push(user);
        return user;
      },
    },
  },
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});