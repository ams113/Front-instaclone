import { gql } from '@apollo/client';



export const ADD_COMMENT = gql`
    mutation addComment($input: CommentInput) {
        addComment(input: $input) {
            idPublication
            comment
        }
    }
`;

export const GET_COMMENT = gql`
    query getComment( $idPublication: ID! ) {
        getComment( idPublication: $idPublication) {
            comment
            idUser {
                name
                userName
                avatar
            }
        }
    }
`;