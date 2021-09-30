import React from 'react';
import logo from '../Navigation/apartment.png'

const Contact = () => {
    return (
        <div className="container card my-3" style={{width: 700}}>
            <div className="row g-0">
                <div className="col-md-4">
                <img src={logo} className="img-fluid rounded-start" alt="logo" />
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">Contact</h5>
                    <p className="card-text">hmd.moknne@gmail.com</p>
                    <p className="card-text"><small className="text-muted">HMDMOK 2021</small></p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;