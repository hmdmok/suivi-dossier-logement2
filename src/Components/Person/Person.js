import React from 'react';


class Person extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            prenom: '',
            prenom_fr: '',
            nom: '',
            nom_fr: '',
            gender: '',
            num_act: '',
            date_n: '',
            lieu_n: '',
            lieu_n_fr: '',
            wil_n: '',
            com_n: '',
            prenom_p: '',
            prenom_p_fr: '',
            prenom_m: '',
            prenom_m_fr: '',
            nom_m: '',
            nom_m_fr: '',
            num_i_n: '',
            stuation_f: '',
            type: '',
            creator: '',
            remark: ''
        }
    }

    onPrenomChange = (event) => {
        this.setState({prenom: event.target.value,});
    }

    onPrenom_frChange = (event) => {
        this.setState({prenom_fr: event.target.value,});
    }
           
    onNomChange = (event) => {
        this.setState({nom: event.target.value,});
    }

    onNom_frChange = (event) => {
        this.setState({nom_fr: event.target.value,});
    }

    onGenderChange = (event) => {
        this.setState({gender: event.target.value,});
    }

    onNum_actChange = (event) => {
        this.setState({num_act: event.target.value,});
    }

    onDate_nChange = (event) => {
        this.setState({date_n: event.target.value,});
    }

    onLieu_nChange = (event) => {
        this.setState({lieu_n: event.target.value,});
    }

    onLieu_n_frChange = (event) => {
        this.setState({lieu_n_fr: event.target.value,});
    }

    onWil_nChange = (event) => {
        this.setState({wil_n: event.target.value,});
    }

    onCom_nChange = (event) => {
        this.setState({com_n: event.target.value,});
    }

    onPrenom_pChange = (event) => {
        this.setState({prenom_p: event.target.value,});
    }

    onPrenom_p_frChange = (event) => {
        this.setState({prenom_p_fr: event.target.value,});
    }

    onPrenom_mChange = (event) => {
        this.setState({prenom_m: event.target.value,});
    }

    onPrenom_m_frChange = (event) => {
        this.setState({prenom_m_fr: event.target.value,});
    }

    onNom_mChange = (event) => {
        this.setState({nom_m: event.target.value,});
    }

    onNom_m_frChange = (event) => {
        this.setState({nom_m_fr: event.target.value,});
    }

    onNum_i_nChange = (event) => {
        this.setState({num_i_n: event.target.value,});
    }

    onStuation_fChange = (event) => {
        this.setState({stuation_f: event.target.value,});
    }

    onRemarkChange = (event) => {
        this.setState({remark: event.target.value,});
    }

    onSubmitPerson = () => {
        
        let perType = "";
        if(this.props.type){perType = "dema"}
        else {perType = "conj";}
        this.setState({type: perType});
        this.setState({creator: this.props.userid});
        
        fetch('http://localhost:3005/Person', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.props.loadUser(user);
                this.props.setAuthent(true);
                this.props.setUsertype(user.usertype);
                this.props.history.push("/DisplayForm");
            }else{
                this.props.setAuthent(false);
                this.props.setUsertype('');
            }
        });
       

    }

   render(){
    return (
        <div className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">
            <h1>{this.props.title}</h1>
	
            <div >
                <div className= "row text-right">
                    <div className="col-sm order-sm-last">
                        <label htmlFor="prenom">الاسم</label>
                        <input type="text" id="prenom" 
                        className="form-control text-right" name="prenom" 
                        placeholder="الاسم" onChange={this.onPrenomChange} /> 
                        <input onChange={this.onPrenom_frChange} type="text" id="prenom_fr" 
                        name="prenom_fr" className="form-control text-right" 
                        placeholder="الاسم باللاتينية" />
                        <br />

                    </div>
                    <div className="col-sm order-sm-first">
                        <label htmlFor="nom">اللقب</label>
                        <input onChange={this.onNomChange} type="text" id="nom" className="form-control text-right"  name="nom"  placeholder="اللقب" />
                        <input onChange={this.onNom_frChange} type="text" id="nom_fr" 
                        name="nom_fr" className="form-control text-right"  
                        placeholder="اللقب باللاتينية" />
                        <br />
                    </div>
                </div> 
                <div className= "row text-right">
                    <div className="col-sm order-sm-last">
                        <div onChange={this.onGenderChange} >
                            <label >الجنس</label>
                            <br />
                            <input type="radio" id="male"  name="gender" value="male" />
                            <label htmlFor="male" className="form-control text-right" >ذكر</label><br />
                            <input type="radio" id="female" name="gender" value="female" />
                            <label htmlFor="female" className="form-control text-right" >أنثى</label><br />
                        </div>
                        
                        <label htmlFor="num_act">رقم عقد الميلاد</label>
                        <input onChange={this.onNum_actChange} type="number" className="form-control text-right" name="num_act" /><br />
                        <label htmlFor="date_n">تاريخ الميلاد </label>
                        <input onChange={this.onDate_nChange} type="date" id="date_n" className="form-control text-right" name="date_n" /><br />

                    </div>
                    <div className="col-sm order-sm-first">
                    <label htmlFor="wil_n">ولاية الميلاد</label>
                        <select onChange={this.onWil_nChange} id="wil_n"  className="form-control text-right" name="wil_n" defaultValue="">
                            <option  value="" disabled hidden>اختر ولاية الميلاد</option>
                            <option value="wil_n"></option>
                        </select><br />

                        <label htmlFor="lieu_n">مكان الميلاد</label>
                        <input onChange={this.onLieu_nChange} type="text" id="lieu_n" className="form-control text-right" name="lieu_n" />
                        <input onChange={this.onLieu_n_frChange} type="text" id="lieu_n_fr"  className="form-control text-right" name="lieu_n_fr" placeholder="مكان الميلاد باللاتينية" /><br />

                        <label htmlFor="com_n">بلدية الميلاد</label>
                        <select onChange={this.onCom_nChange} id="com_n" className="form-control text-right" name="com_n" defaultValue="">
                            <option  value="" disabled  hidden>اختر بلدية الميلاد</option>
                            <option value="com_n"></option>
                        </select><br />

                        <label htmlFor="prenom_p"> اسم الاب</label>
                        <input onChange={this.onPrenom_pChange} type="text" id="prenom_p" className="form-control text-right" name="prenom_p" /> 
                        <input onChange={this.onPrenom_p_frChange} type="text" id="prenom_p_fr" className="form-control text-right" name="prenom_p_fr" placeholder="اسم الاب باللاتينية" /><br />

                    </div>
                </div>
                
                <div className= "row text-right">
                    <div className="col-sm order-sm-last">
                        <label htmlFor="prenom_m"> اسم الأم</label>
                        <input onChange={this.onPrenom_mChange} type="text" id="prenom_m" className="form-control text-right" name="prenom_m" /> 
                        <input onChange={this.onPrenom_m_frChange} type="text" id="prenom_m_fr" className="form-control text-right" name="prenom_m_fr" placeholder="اسم الأم باللاتينية" /><br />
                    </div>
                    <div className="col-sm order-sm-first">
                        <label htmlFor="nom_m">لقب الأم</label>
                        <input onChange={this.onNom_mChange} type="text" id="nom_m" className="form-control text-right" name="nom_m" />
                        <input onChange={this.onNom_m_frChange} type="text" id="nom_m_fr" className="form-control text-right" name="nom_m_fr" placeholder="لقب الأم باللاتينية" /><br />
                    </div>
                </div> 
                <div className="text-right">
                    <label htmlFor="num_i_n"> رقم التعريف الوطني</label>
                    <input onChange={this.onNum_i_nChange} type="text" id="num_i_n" className="form-control text-right" name="num_i_n" />
                    <label htmlFor="remark"> ملاحظات</label>
                    <input onChange={this.onRemarkChange} type="text" id="remark" className="form-control text-right" name="remark" />
                </div>
                
                <div onChange={this.onStuation_fChange} hidden={!this.props.type} className="text-right">
                    <div className="intro"><label >الحالة العائلية</label> </div> <br />

                    <input type="radio" id="cilib" name="stuation_f" value="cilib" />
                    <label htmlFor="cilib" className="form-control text-right">أعزب\عزباء </label><br />
    
                    <input type="radio" id="marie" name="stuation_f" value="marie" />
                    <label htmlFor="marie" className="form-control text-right">متزوج\ة</label><br />
    
                    <input type="radio" id="divor" name="stuation_f" value="divor" />
                    <label htmlFor="divor" className="form-control text-right">مطلق\ة</label><br />
    
                    <input type="radio" id="veuf" name="stuation_f" value="veuf" />
                    <label htmlFor="veuf" className="form-control text-right">أرمل\ة</label><br />
                </div>
                <hr/>
                <div className= "row text-right">
                    <div className="col-sm order-sm-last my-2">
                        <input onClick={this.onSubmitPerson} type="submit" className="btn btn-lg btn-primary btn-block"  value="حفظ" />  
                    </div>
                    <div className="col-sm order-sm-first my-2">
                        <input type="reset" className="btn btn-lg btn-primary btn-block" value="إلغاء" />
                    </div>
                </div>
                
                
            </div>
        </div>
    );
    }
}

export default Person;