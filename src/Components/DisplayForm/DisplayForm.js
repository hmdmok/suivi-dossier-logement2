import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import file from './file.png';
import demandeur from './demandeur.png';
import update from './update.png';

class DisplayForm extends Component {
    constructor() {
        super();
        this.state = {
          input: ''        
        }
      }

    render() {
        return (
            <div className="container border shadow p-3 mb-5 mt-5 bg-body rounded">
                <div class="row justify-content-md-center">
                    <h1 className="col-12">الصفحة الرئيسة</h1>
                </div>
                <div class="row d-flex flex-row-reverse">
                    <div className="m-5" >
                        <Logo title={"تحرير ملف"} pic={file}/>
                    </div>
                    <div className="m-5" >
                        <Logo title={"تحرير طالب"} pic={demandeur} />
                    </div>
                    <div className="m-5" >
                        <Logo title={"تحيين ملف"} pic={update} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayForm;