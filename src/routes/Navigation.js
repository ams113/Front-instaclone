import React from 'react';
import routes from './routes';
import { map } from 'lodash';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';


export const Navigation = () => {
    return (
        <Router>
            <Switch>
                { map( routes, (route, index ) => (
                    <Route 
                        key={ index }
                        path={ route.path }
                        exact={route.exact }
                        render={ ( props ) => (
                            <route.layout>
                                <route.component {...props} />
                            </route.layout>
                        )}
                    />
                ) )};
            </Switch>
        </Router>
    )
}