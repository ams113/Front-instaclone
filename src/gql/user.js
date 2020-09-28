import { gql } from '@apollo/client';

export const GET_USER = gql`
   query getUser($id: ID, $userName: String) {
        getUser(id: $id, userName: $userName) {
            id
            name
            userName
            email
            siteWeb
            description
            avatar
        }
    }
`;

export const SEARCH_USER = gql`
   query search( $search: String) {
        search( search: $search ) {
                name
                userName
                siteWeb
                avatar
        }
    }
`;

export const REGISTER = gql`
    mutation register($input: UserInput) {
        register(input: $input) {
            id
            userName
            email
            createAt
        }
    }
`;

export const LOGIN = gql`
    mutation login( $input: LoginInput) {
        login(input: $input) {
            token
        }
    }
`;

export const UPDATE_AVATAR = gql`
    mutation updateAvatar($file: Upload) {
        updateAvatar( file: $file ) {
            status
            urlAvatar
        }
    }
`;

export const DELETE_AVATAR = gql`
    mutation deleteAvatar {
        deleteAvatar
    }   
`;

export const UPDATE_USER = gql`
    mutation updateUser($input: UserUpdateInput) {
        updateUser(input: $input)
    }
`;

