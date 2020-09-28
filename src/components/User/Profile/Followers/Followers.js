import React, { useEffect, useState } from 'react';
import { GET_FOLLOWEDS, GET_FOLLOWERS } from '../../../../gql/follow';
import ModalBasic from '../../../Modal/ModalBasic/ModalBasic';
import { useQuery } from '@apollo/client';
import { size } from 'lodash';
import './Followers.scss';
import ListUsers from '../../ListUsers';

export const Followers = ( { userName, totalPublications } ) => {

    const [showModal, setShowModal] = useState( false );

    const [titleModal, setTitleModal] = useState( '' );

    const [childrenModal, setChildrenModal] = useState( null );

    const {
        data: dataFollowers, 
        loading: loadingFollowers, 
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers 
    } = useQuery( GET_FOLLOWERS, {
        variables: { userName }
    } );

    const {
        data: dataFolloweds, 
        loading: loadingFolloweds, 
        startPolling: startPollingFolloweds,
        stopPolling: stopPollingFolloweds 
    } = useQuery( GET_FOLLOWEDS, {
        variables: { userName }
    } );

    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        }
    }, [ startPollingFollowers, stopPollingFollowers]);

    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        }
    }, [ startPollingFolloweds, stopPollingFolloweds]);

    if ( loadingFollowers || loadingFolloweds ) return null;

    const { getFollowers } = dataFollowers;
    const { getFolloweds } = dataFolloweds;


    const openModalFollowers = () => {
        setTitleModal( 'Seguidores' );
        setChildrenModal( 
            <ListUsers users={ getFollowers } setShowModal={ setShowModal } />
        );
        setShowModal( true );
    };

    const openModalFolloweds = () => {
        setTitleModal( 'Usuarios seguidos' );
        setChildrenModal( 
            <ListUsers users={ getFolloweds } setShowModal={ setShowModal } />
        );
        setShowModal( true );
    };

    

    return (
        <>
            <div className="followers">
                <p>
                    <span>{ totalPublications }</span> publicaciones
                </p>
                <p className="link" onClick={ openModalFollowers } >
                    <span>{ size( getFollowers ) }</span> seguidores
                </p>
                <p className="link" onClick={ openModalFolloweds } >
                    <span>{ size( getFolloweds ) }</span> seguidos
                </p>
            </div>
            <ModalBasic show={ showModal } setShow={ setShowModal } title={ titleModal } > 
                { childrenModal }
            </ModalBasic>
        </>
    )
}

export default Followers;