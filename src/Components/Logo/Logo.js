import React from 'react';
import Tilt from 'react-tilt'
 

const Logo = ({title , pic}) => {
    return (
        <Tilt className="Tilt" options={{ max : 20 }} style={{ height: 175, width: 175 }} >
            <div className="Tilt-inner border shadow p-3 m-0 mb-5 bg-body rounded" >
                {title}
                <br /> 
                <img src={pic} alt="logo" height="100" width="100"/>
            </div>
        </Tilt>    
    );
}

export default Logo;