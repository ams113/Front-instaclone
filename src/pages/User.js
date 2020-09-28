import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/User/Profile';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/publication';
import { size } from 'lodash';
import Publications from '../components/Publications/Publication';


export const User = () => {
    
    
    const { user } = useParams();
    
    const { data, loading, startPolling, stopPolling } = useQuery( GET_PUBLICATIONS, {
        variables: { userName: user },
    } );

    useEffect(() => {
        startPolling(1500);
        
    }, [startPolling, stopPolling])

    if ( loading ) return null;

    const { getPublications } = data;


    return (
        <>
            <Profile userName={ user } totalPublications={ size(getPublications) } />
            <Publications getPublications={ getPublications } />
        </>
    )
}

export default User;