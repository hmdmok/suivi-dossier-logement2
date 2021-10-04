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
            remark: '',
            wilayas: [],
            communes: []
        }
    }

    async componentDidMount(){
        const response = await fetch('http://localhost:3005/Wilaya');
        const data = await response.json();
        this.setState({ wilayas: data});
        
    }

    async componentDidUpdate(){
        if (this.state.wil_n > 0){
            const code_wilaya = this.state.wil_n;
            const url = 'http://localhost:3005/Communes/'+code_wilaya;
            const response = await fetch(url);
            const communes = await response.json();
            this.setState({ communes: communes});           
        }
         
    }

    onHandleChange = (event) => {
        const userID = this.props.getUserid();  
        this.setState({creator: userID,})
        this.setState({[event.target.name]: event.target.value,});
        
    }

    onSubmitPerson = (event) => {
        event.preventDefault();
        let perType = "";
        if(this.props.type){perType = "dema"}
        else {perType = "conj";}
        this.setState({type: perType});

        fetch('http://localhost:3005/Person', {
            method: 'post', 
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){ 
                this.props.history.push("/DisplayForm");
            }
        });
       

    }

   render(){
    return (
        <div className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">
            <h1>{this.props.title}</h1>
	
            <form onSubmit={this.onSubmitPerson} >
                <div className= "row text-right">
                    <div className="col-sm order-sm-last">
                        <label htmlFor="prenom">الاسم</label>
                        <input 
                            type="text" 
                            id="prenom" 
                            className="form-control text-right" 
                            name="prenom" 
                            placeholder="الاسم" 
                            onChange={this.onHandleChange} 
                        /> 
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="prenom_fr" 
                            name="prenom_fr" 
                            className="form-control text-right" 
                            placeholder="الاسم باللاتينية" 
                        />
                        <br />

                    </div>
                    <div className="col-sm order-sm-first">
                        <label htmlFor="nom">اللقب</label>
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="nom" 
                            className="form-control text-right"  
                            name="nom"  
                            placeholder="اللقب" 
                        />
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="nom_fr" 
                            name="nom_fr" 
                            className="form-control text-right"  
                            placeholder="اللقب باللاتينية" 
                        />
                        <br />
                    </div>
                </div> 
                <div className= "row text-right">
                    <div className="col-sm order-sm-last">
                        <div name="gender" onChange={this.onHandleChange} >
                            <label >الجنس</label>
                            <br />
                            <input type="radio" id="male"  name="gender" value="m" />
                            <label htmlFor="male" className="form-control text-right" >ذكر</label><br />
                            <input type="radio" id="female" name="gender" value="f" />
                            <label htmlFor="female" className="form-control text-right" >أنثى</label><br />
                        </div>
                        
                        <label htmlFor="num_act">رقم عقد الميلاد</label>
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            className="form-control text-right" 
                            name="num_act" 
                            required
                        /><br />

                        <label htmlFor="date_n">تاريخ الميلاد </label>
                        <input 
                            onChange={this.onHandleChange} 
                            type="date" 
                            id="date_n" 
                            className="form-control text-right" 
                            name="date_n"
                            defaultValue="01-01-1900" 
                            required
                        /><br />

                    </div>
                    <div className="col-sm order-sm-first">
                    <label htmlFor="wil_n">ولاية الميلاد</label>
                        <select 
                            onChange={this.onHandleChange} 
                            id="wil_n"  
                            className="form-control text-right" 
                            name="wil_n" 
                            defaultValue="-1"
                            required>
                            
                            <option  value="-1" disabled hidden>اختر ولاية الميلاد</option>
                            {this.state.wilayas.map( wilaya => (
                                <option key={wilaya.id} value={wilaya.code} >{wilaya.nom_wilaya}</option>
                            )
                            )}
                            
                        </select><br />

                        <label htmlFor="lieu_n">مكان الميلاد</label>
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="lieu_n" 
                            className="form-control text-right" 
                            name="lieu_n" 
                        />
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="lieu_n_fr"  
                            className="form-control text-right" 
                            name="lieu_n_fr" 
                            placeholder="مكان الميلاد باللاتينية" 
                        /><br />

                        <label htmlFor="com_n">بلدية الميلاد</label>
                        <select 
                            onChange={this.onHandleChange} 
                            id="com_n" 
                            className="form-control text-right" 
                            name="com_n" 
                            defaultValue="-1"
                            required>

                            <option  value="-1" disabled  hidden>اختر بلدية الميلاد</option>
                            {this.state.communes.map( commune => (
                                <option key={commune.id} value={commune.code} >{commune.nom_commune}</option>
                            )
                            )}
                        </select><br />

                        <label htmlFor="prenom_p"> اسم الاب</label>
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="prenom_p" 
                            className="form-control text-right" 
                            name="prenom_p" 
                        /> 
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="prenom_p_fr" 
                            className="form-control text-right" 
                            name="prenom_p_fr" 
                            placeholder="اسم الاب باللاتينية" 
                        /><br />

                    </div>
                </div>
                
                <div className= "row text-right">
                    <div className="col-sm order-sm-last">
                        <label htmlFor="prenom_m"> اسم الأم</label>
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="prenom_m" 
                            className="form-control text-right" 
                            name="prenom_m" 
                        /> 
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="prenom_m_fr" 
                            className="form-control text-right" 
                            name="prenom_m_fr" 
                            placeholder="اسم الأم باللاتينية" 
                        /><br />
                    </div>
                    <div className="col-sm order-sm-first">
                        <label htmlFor="nom_m">لقب الأم</label>
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="nom_m" 
                            className="form-control text-right" 
                            name="nom_m" 
                        />
                        <input 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="nom_m_fr" 
                            className="form-control text-right" 
                            name="nom_m_fr" 
                            placeholder="لقب الأم باللاتينية" 
                        /><br />
                    </div>
                </div> 
                <div className="text-right">
                    <label htmlFor="num_i_n"> رقم التعريف الوطني</label>
                    <input 
                        onChange={this.onHandleChange} 
                        type="text" 
                        id="num_i_n" 
                        className="form-control text-right" 
                        name="num_i_n" 
                    />
                    
                    <label htmlFor="remark"> ملاحظات</label>
                    <input 
                        onChange={this.onHandleChange} 
                        type="text" 
                        id="remark" 
                        className="form-control text-right" 
                        name="remark" 
                    />
                </div>
                
                <div 
                    name="stuation_f"
                    onChange={this.onHandleChange} 
                    hidden={!this.props.type} 
                    className="text-right">

                    <div className="intro"><label >الحالة العائلية</label> </div> <br />

                    <input type="radio" id="cilib" name="stuation_f" value="c" />
                    <label htmlFor="cilib" className="form-control text-right">أعزب\عزباء </label><br />
    
                    <input type="radio" id="marie" name="stuation_f" value="m" />
                    <label htmlFor="marie" className="form-control text-right">متزوج\ة</label><br />
    
                    <input type="radio" id="divor" name="stuation_f" value="d" />
                    <label htmlFor="divor" className="form-control text-right">مطلق\ة</label><br />
    
                    <input type="radio" id="veuf" name="stuation_f" value="v" />
                    <label htmlFor="veuf" className="form-control text-right">أرمل\ة</label><br />
                </div>
                <hr/>
                <div className= "row text-right">
                    <div className="col-sm order-sm-last my-2">
                        <input type="submit" className="btn btn-lg btn-primary btn-block"  value="حفظ" />  
                    </div>
                    <div className="col-sm order-sm-first my-2">
                        <input type="reset" className="btn btn-lg btn-primary btn-block" value="إلغاء" />
                    </div>
                </div>
                
                
            </form>
        </div>
    );
    }
}

export default Person;