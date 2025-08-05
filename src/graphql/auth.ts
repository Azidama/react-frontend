import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation Login($userData: LoginUserDto!) {
        login(userData: $userData)
    }
`
// const LoginPage = () => {
// export const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
//     onCompleted: (data) => {
//     // Handle successful login
//     localStorage.setItem('token', data.login.token);
//     console.log('Login token:', data.login.token)
//     // Store user data in context/Redux if needed
//     // navigate('/dashboard');
//     },
//     onError: (err) => {
//         console.log(err)
//     // Errors handled automatically
//     }
// })