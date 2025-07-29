import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(userData: { email: $email, password: $password }) {
      token
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`