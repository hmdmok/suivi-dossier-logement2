import React from 'react';
import Logo from '../Logo/Logo';

const DisplayForm = ({onInputChange}) => {
    return (
        <div className="container border shadow p-3 mb-5 bg-body rounded">
            <div class="row justify-content-md-center">
                <h1 className="col-12">الصفحة الرئيسة</h1>
            </div>
            <div class="row d-flex flex-row-reverse">
                <div className="m-5" >
                    <Logo />
                </div>
                <div className="m-5" >
                    <Logo />
                </div>
                <div className="m-5" >
                    <Logo />
                </div>
            </div>
        </div>
    );
}

export default DisplayForm;