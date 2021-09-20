import React from 'react';
import { Route, Redirect } from 'react-router';

function ProtectedRoute({ setAuthent, setUsertype, loadUser, getAuthent, usertype, component: Component, ...rest}) {
    return(
        <Route {...rest} render={(props)=>{
            if (getAuthent()) {
                // console.log(getAuthent());
                return <Component {...props} usertype={usertype} loadUser={loadUser} setAuthent={setAuthent} setUsertype={setUsertype}/>;
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