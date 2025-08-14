import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($userData: LoginUserDto!) {
    login(userData: $userData)
  }
`
