import React from 'react';
import Tilt from 'react-tilt'
import Apartment from '../Navigation/apartment.png';
 

const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt border shadow p-3 mb-5 bg-body rounded" options={{ max : 20 }} style={{ height: 175, width: 175 }} >
                <div className="Tilt-inner"> متابعة طلبات السكن <br /> <img src={Apartment} alt="logo" height="100" width="100"/></div>
            </Tilt>
        </div>
    );
}

export default Logo;