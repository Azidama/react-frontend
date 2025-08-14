import { gql } from '@apollo/client'

export const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id
      code
      title
      description
    }
  }
`
