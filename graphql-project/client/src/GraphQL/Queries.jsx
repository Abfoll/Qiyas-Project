import { gql } from "graphql-tag";

export const LOAD_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      email
      password
    }
  }
`;