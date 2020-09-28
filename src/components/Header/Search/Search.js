import React, { useEffect, useState } from 'react';
import { Image, Search as Searchui } from 'semantic-ui-react';
import ImageNotFound from '../../../assets/png/avatar.png';
import { SEARCH_USER } from '../../../gql/user';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { size } from 'lodash';
import './Search.scss';

export const Search = () => {

    const [search, setSearch] = useState( null );

    const [results, setResults] = useState([]);

    const { data, loading } = useQuery( SEARCH_USER, {
        variables: { search },
    } );



    useEffect( () => { 
        if ( size(data?.search) > 0  ) {

            const users = [];

            data.search.forEach( ( user, index ) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.userName,
                    avatar: user.avatar
                });

                setResults( users );
            });
        } else {
            setResults( [] );
        }
    }, [data]);

    const onChange = ( e ) => {
        if ( e.target.value ) {
            setSearch( e.target.value );
        } else {
            setSearch( null );
        }
    };

    const handleResultSelect = () => {
        setSearch(null);
        setResults([]);
    }

    return (
        <Searchui
            className="search-users"
            fluid
            input= { { icon: "search", iconPosition: "left"} }
            loading={ loading }
            value= { search || "" }
            onSearchChange= { onChange }
            onResultSelect= { handleResultSelect }
            results= { results }
            resultRenderer= { (e) => <ResultSearch data={ e } /> }
        />
    )
}


function ResultSearch( { data } ) {

    return (
            <Link className="search-users__item" to={ `/${ data.username }`}>
                <Image src={ data.avatar ? data.avatar : ImageNotFound} />
                <div>
                    <p>{ data.title }</p>
                    <p>{ data.username }</p>
                </div>
            </Link>
    );
    
}

export default Search;
