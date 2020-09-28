import React from 'react';
import { Grid } from 'semantic-ui-react';
import Feed from '../../components/Home/Feed/Feed';
import UsersNotFolloweds from '../../components/Home/UsersNotFolloweds/UsersNotFolloweds';
import useAuth from '../../hook/useAuth';


export const Home = () => {

    const auth = useAuth();
    console.log(auth);

    return (
        <Grid className="home">
            <Grid.Column className="home__left" width={ 11 } >
                <Feed />
            </Grid.Column>
            <Grid.Column className="home__right" width={ 5 } >
                <UsersNotFolloweds />
            </Grid.Column>
        </Grid>
    )
}

export default Home;