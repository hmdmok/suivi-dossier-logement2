import React from 'react';
import Tilt from 'react-tilt'; 
import {useHistory} from 'react-router-dom'


const Logo = ({root, title, pic}) => {
    let history = useHistory();
    return (
        <div onClick={() => {history.push(root)}} >
            <Tilt  className="logo border shadow p-3 m-1 bg-body rounded" style={{ height: 175, width: 175 } }  >
                {title}
                <br /> 
                <img src={pic} alt="logo" height="100" width="100"/>
            </Tilt>
        </div> 
    );
}

export default Logo;