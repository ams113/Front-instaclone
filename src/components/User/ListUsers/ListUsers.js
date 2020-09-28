import { map, size } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import ImageNotFound from '../../../assets/png/avatar.png';
import './ListUsers.scss';


export const ListUsers = ( { users, setShowModal }) => {
    
    const history = useHistory();

    const goToUser = ( userName ) => {
        setShowModal( false );
        history.push( `/${ userName }` ); 
    }

    return (
        <div className="list-users">
            {
                size( users ) === 0 ? (
                    <p className="list-users__not-users">
                        No se han encontrado usuarios
                    </p>
                ) : (
                    map( users, (user, index ) => (
                        <div 
                            key={ index } 
                            className="list-users__user"
                            onClick={ () => goToUser( user.userName )} >
                                <Image src={ user.avatar || ImageNotFound } avatar />
                                <div>
                                    <p>{ user.name }</p>
                                    <p>{ user.userName }</p>
                                </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default ListUsers;