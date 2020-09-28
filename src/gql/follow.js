import { gql } from '@apollo/client';



export const IS_FOLLOW = gql`
    query isFollow($userName: String!) {
        isFollow(userName: $userName)
    } 
`;

export const GET_FOLLOWERS = gql`
    query getFollowers($userName: String!) {
        getFollowers(userName: $userName) {
            name
            userName
            avatar
        }
    } 
`;
export const GET_FOLLOWEDS = gql`
    query getFolloweds($userName: String!) {
        getFolloweds(userName: $userName) {
            name
            userName
            avatar
        }
    } 
`;
export const GET_NOT_FOLLOWEDS = gql`
    query getNotFolloweds {
        getNotFolloweds{
            userName
            name
            email
        }
    }
`;


export const FOLLOW = gql`
    mutation follow( $userName: String! ) {
        follow( userName: $userName)
    }
`;

export const UNFOLLOW = gql`
    mutation unFollow($userName: String!) {
        unFollow(userName: $userName)
    }
`;
