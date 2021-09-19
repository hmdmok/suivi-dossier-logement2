import React from 'react';
import { Route, Redirect } from 'react-router';

function ProtectedRoute({ getAuthent, usertype, component: Component, ...rest}) {
    return(
        <Route {...rest} render={(props)=>{
            if (getAuthent()) {
                console.log(getAuthent());
                return <Component usertype={usertype} />;
            } else{
                console.log(getAuthent());
                return(
                    <Redirect to={{pathname: '/', state: {from: props.location}}} />
                );
            }
        }

        } />
    );
} 

export default ProtectedRoute;