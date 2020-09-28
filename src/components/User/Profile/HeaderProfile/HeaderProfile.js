import React from 'react';
import './HeaderProfile.scss';
import { Button } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { FOLLOW, IS_FOLLOW, UNFOLLOW } from '../../../../gql/follow';

export const HeaderProfile = ( { userName, auth, handleModal }) => {

    const [follow] = useMutation( FOLLOW );

    const [unFollow] = useMutation( UNFOLLOW );

    const { data, loading, refetch } = useQuery( IS_FOLLOW, {
        variables: { userName }
    });


    const btnFollow = () => {
        
        if ( data.isFollow ) {
            
            return (
                <Button className="btn-danger" onClick={ onUnFollow } >
                    Dejar de seguir
                </Button>
            )

        } else {
            
            return (
                <Button className="btn-action" onClick={ onFollow } >
                    Seguir
                </Button>
            )

        }
    };

    const onFollow = async () => {
        
        try {
            
            await follow( { variables: { userName } });
            refetch();

        } catch (error) {
            console.log( error );
        }
    };

    const onUnFollow = async () => {
        console.log('onUnFollow');
        try {
            
            await unFollow( { variables: { userName } });
            refetch();

        } catch (error) {
            console.log( error );
        }
    }


    return (
        <div className="header-profile">
            <h2>{ userName }</h2>
            { userName === auth.userName ? 
            ( <Button onClick={ () => handleModal('settings') } >Ajustes</Button> ) : 
            ( !loading && btnFollow() )}
        </div>
    )
}

export default HeaderProfile;