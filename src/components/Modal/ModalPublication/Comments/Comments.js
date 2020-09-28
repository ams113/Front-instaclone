import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENT } from '../../../../gql/comment';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import ImageNotFound from '../../../../assets/png/avatar.png';
import './Comments.scss';

export const Comments = ( { publication } ) => {

    const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENT, {
        variables: { idPublication: publication.id }
    });

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);

    if ( loading ) return null;

    const { getComment } = data;


    return (
        <div className="comments">
            {
                map( getComment, (comment, index ) => (
                    <Link 
                        key={ index }
                        to={ `/${ comment.idUser.userName }` } 
                        className="comment"    
                    >
                            <Image src={ comment.idUser.avatar || ImageNotFound } avatar />
                            <div>
                                <p>{ comment.idUser.userName }</p>
                                <p>{ comment.comment }</p>
                            </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Comments;