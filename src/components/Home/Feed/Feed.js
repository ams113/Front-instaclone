import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_PUBLICATIONS_FOLLOWEDS } from '../../../gql/publication';
import ImageNotFound from '../../../assets/png/avatar.png';
import './Feed.scss';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import Actions from '../../Modal/ModalPublication/Actions';
import CommentForm from '../../Modal/ModalPublication/CommentForm';
import ModalPublication from '../../Modal/ModalPublication/';



export const Feed = () => {

    const [selectPublication, setSelectPublication] = useState( null );
    const [showModal, setShowModal] = useState( false );

    const { data, loading, startPolling, stopPolling } = useQuery( GET_PUBLICATIONS_FOLLOWEDS );

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if ( loading ) return null;

    const { getPublicationsFolloweds } = data;

    const openPublication = ( publication ) => {

        setSelectPublication( publication );
        setShowModal( true );
    };

    return (
        <>
            <div className="feed">
                { 
                    map( getPublicationsFolloweds, ( publication, index ) => (
                        <div 
                            key={ index }
                            className="feed__box"
                        >
                            <Link to={`/${publication.idUser.userName}`} >
                                <div className="feed__box-user">
                                    <Image
                                        src= { publication.idUser.avatar || ImageNotFound }
                                        avatar
                                    />
                                    <span> { publication.idUser.name } </span>
                                </div>
                            </Link>
                            <div
                                className="feed__box-photo"
                                style={ { backgroundImage: `url("${ publication.file }")`} }
                                onClick= { () => openPublication( publication ) }
                            />
                            <div className="feed__box-actions">
                                <Actions publication={ publication }/>
                            </div>
                            <div className="feed__box-form" >
                                <CommentForm publication={ publication } />
                            </div>
                        </div>
                    ))
                }
            </div>
            { 
                showModal && (
                    <ModalPublication 
                        show={ showModal }
                        setShow={ setShowModal }
                        publication={ selectPublication }
                    />
                )
            }
        </>
    )
}

export default Feed;