import React, { useState } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';
import ImageNotFound from '../../../assets/png/avatar.png';
import './RightHeader.scss';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import ModalUpload from '../../Modal/ModalUpload/ModalUpload';


export const RightHeader = () => {

    const [showModal, setShowModal] = useState( false );

    const { auth } = useAuth();

    const { data, loading, error } = useQuery( GET_USER, {
        variables: { userName: auth.userName },
    });

    if ( loading || error ) return null;

    const { getUser } = data;
    



    return (
        <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home" /> 
                </Link>
                <Link to="/" onClick={ () => setShowModal( true ) }>
                    <Icon name="plus" /> 
                </Link>
                <Link to={ `/${auth.userName}` } >
                    <Image src={ getUser.avatar ? getUser.avatar : ImageNotFound } avatar /> 
                </Link>
            </div>
            <ModalUpload  show={ showModal } setShow={ setShowModal } />
        </>
    )
}

export default RightHeader;
