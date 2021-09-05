import React from 'react';
import Tilt from 'react-tilt'
import Apartment from '../Navigation/apartment.png';
 

const Logo = (title) => {
    return (
        <Tilt className="Tilt" options={{ max : 20 }} style={{ height: 175, width: 175 }} >
            <div className="Tilt-inner border shadow p-3 m-0 mb-5 bg-body rounded" >
                متابعة طلبات السكن
                <br /> 
                <img src={Apartment} alt="logo" height="100" width="100"/>
            </div>
        </Tilt>    
    );
}

export default Logo;