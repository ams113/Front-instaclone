import { useQuery } from '@apollo/client';
import { map } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import ImageNotFound from '../../../assets/png/avatar.png';
import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';
import './UsersNotFolloweds.scss';

export const UsersNotFolloweds = () => {

    const { data, loading } = useQuery( GET_NOT_FOLLOWEDS );

    if ( loading ) return null;

    const { getNotFolloweds } = data;


    return (
        <div className="users-not-followeds">
            <h3>Sugerencias para ti</h3>
            {
                map( getNotFolloweds, (user, index ) => (
                    <Link key={ index } to={ `/${ user.userName }`}
                        className="users-not-followeds__user" >

                            <Image src={ user.avatar || ImageNotFound } avatar />
                            <span>{ user.name }</span>

                    </Link>
                ))
            }
        </div>
    )
}

export default UsersNotFolloweds;
