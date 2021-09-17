import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import file from './file.png';
import demandeur from './demandeur.png';
import update from './update.png';

class DisplayForm extends Component {
    
    render() {
        return (
            <div className="container border shadow p-4 mb-3 mt-3 bg-body rounded" >
                <div className="d-flex justify-content-center">
                    <h1 className="col-12">الصفحة الرئيسة</h1>
                </div>
                <div className="row d-flex justify-content-center flex-row-reverse">
                    <div className="m-2" >
                        <Logo root={"/Dossier"} title={"تحرير ملف"} pic={file}/>
                    </div>
                    <div className="m-2" >
                        <Logo root={"/Demandeur"} title={"تحرير طالب"} pic={demandeur} />
                    </div>
                    <div className="m-2" >
                        <Logo root={"/Demandeur"} title={"تحيين ملف"} pic={update} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayForm;