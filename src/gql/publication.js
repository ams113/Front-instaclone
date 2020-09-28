import { gql } from '@apollo/client';



export const PUBLISH = gql`
    mutation publish( $file: Upload ) {
        publish( file: $file) {
            status
            urlFile
        }
    } 
`;

export const GET_PUBLICATIONS = gql`
    query getPublications($userName: String!) {
        getPublications(userName: $userName) {
            id
            idUser
            file 
            typeFile
        }
    } 
`;

export const GET_PUBLICATIONS_FOLLOWEDS = gql`
    query getPublicationsFolloweds {
        getPublicationsFolloweds {
            id
            idUser {
                name
                userName
                avatar
            }
            file
            typeFile
            createAt
        }
    }
`;
