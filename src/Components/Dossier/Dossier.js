import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Person from '../Person/Person'

class Dossier extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newpersons: [],
            person: {},
            hide_new: false,
            hide_saisi: true,
            root: "new",
            hide_conj: true,
            creator: "",
            date_depo: "",
            num_dos: "",
            num_enf: ""
        }
    }
    
    componentDidMount(){
        const userID = this.props.getUserid();  
        this.setState({creator: userID,})
        fetch('http://localhost:3005/Person')
        .then(response => response.json())
        .then(data => this.setState({ newpersons: data}))
        .catch(err => console.log(err));
         
    }

    onPersonSelected = (event) => {
        const person_id = event.target.className;
        fetch('http://localhost:3005/Person/'+person_id)
        .then(response => response.json())
        .then(data => this.setState({ person: data}))
        .then(() => {
            this.setState({hide_new: true });
            this.setState({hide_saisi: false});
            if(this.state.person.stuation_f === "m") {this.setState({hide_conj: false});}
            console.log(this.state.person)
        })
        .catch(err => console.log(err));
    }

    onSubmitDossier = (event) => {
        event.preventDefault();
        console.log(this.state)
    }

    onHandleChange = (event) => {
        
        this.setState({[event.target.name]: event.target.value,})
        // if (event.target.name === "wil_n"){
        //     const code_wilaya = event.target.value;
        //     const url = 'http://localhost:3005/Communes/'+code_wilaya;
        //     fetch(url)
        //     .then(response => response.json())
        //     .then(communes => this.setState({ communes: communes}))
        //     .catch(err => console.log(err));
        // }
        console.log(this.state)
    }

    render(){
        const {usertype} = this.props;
        if (this.state.root === 'new') 
        if (usertype !== ''){
            // console.log(usertype);
            return (
                <div className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">
                    <div hidden={this.state.hide_new}>   
                        <h1 className="my-5">الرجاء إختيار الشخص المراد ادخال ملفه</h1>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">رقم</th>
                                <th scope="col">الاسم</th>
                                <th scope="col">اللقب</th>
                                <th scope="col">تاريخ الميلاد</th>
                                </tr>
                            </thead>
                            <tbody onClick={this.onPersonSelected}>
                                {this.state.newpersons.map( (person, i) => (
                                    <tr className={person.id} key={person.id+i}>
                                        <th  className={person.id} scope="row">{person.id}</th>
                                        <td className={person.id}>{person.prenom}</td>
                                        <td className={person.id}>{person.nom}</td>
                                        <td className={person.id} >{person.date_n}</td>
                                    </tr>
                                    // <option key={wilaya.id} value={wilaya.code} >{wilaya.nom_wilaya}</option>
                                )
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                    

                    <form onSubmit={this.onSubmitDossier} className="" hidden={this.state.hide_saisi}>
                        <h1>الرجاء إدخال بيانات ملف طلب السكن</h1>
                        <h2 >{"السيد(ة): "+this.state.person.nom+" "+this.state.person.prenom}</h2><br/>
                        <div className= "row text-right">
                            <div className="col-sm order-sm-last">
                                <label htmlFor="date_depo"> تاريخ الإيداع </label>
                                <input 
                                    type="date" 
                                    id="date_depo" 
                                    name="date_depo"
                                    className="form-control text-right"  
                                    onChange={this.onHandleChange}  
                                /><br />

                                <label htmlFor="num_dos"> رقم الملف : </label>
                                <input 
                                    type="text" 
                                    id="num_dos" 
                                    name="num_dos"
                                    className="form-control text-right"  
                                    onChange={this.onHandleChange}  
                                /><br />
                            </div>
                            <div className="col-sm order-sm-first"> 
                                <label >عدد الأولاد</label><br />
                                <label htmlFor="num_enf"></label>
                                <input 
                                    type="number" 
                                    name="num_enf" 
                                    className="form-control text-right"  
                                    onChange={this.onHandleChange}
                                /><br />
                                <label >الحالة الشخصية</label><br />

                                <input type="checkbox" id="neant" name="stuation_s" value="neant" />
                                <label htmlFor="neant"> لاشيء </label><br />

                                <input type="checkbox" id="avec_d" name="stuation_s" value="avec_d" />
                                <label htmlFor="avec_d"> ذوي حقوق</label><br />

                                <input type="checkbox" id="andicap" name="stuation_s" value="andicap" />
                                <label htmlFor="andicap"> معاق</label><br /><br />
                            </div>
                        </div>    
                        <div className= "row text-right">
                            <div className="col-sm order-sm-last">
                                <div className="intro">	<label >ظروف السكن</label></div><br />

                                <input type="radio" id="garage" name="stuation_d" value="garage" />
                                <label htmlFor="garage">محل غير مخصص للسكن </label><br />

                                <input type="radio" id="legem_1" name="stuation_d" value="legem_1" />
                                <label htmlFor="legem_1">سكن خطر مهدد بالانهيار ملك جماعي</label><br />

                                <input type="radio" id="legem_2" name="stuation_d" value="legem_2" />
                                <label htmlFor="legem_2">سكن خطر مهدد بالانهيار ملك فردي</label><br />

                                <input type="radio" id="legem_3" name="stuation_d" value="legem_3" />
                                <label htmlFor="legem_3">سكن عند الأقارب او مستأجر</label><br />

                                <input type="radio" id="leg_f" name="stuation_d" value="leg_f" />
                                <label htmlFor="leg_f">سكن وظيفي</label><br />

                                

                            </div>
                            <div className="col-sm order-sm-first"> 
                                <div className="intro">	<label >هل يوجد أشخاص متكفل بهم</label></div><br />
                                <select id="personne_s" defaultValue="non">
                                    <option value="non" >لا</option>
                                    <option value="oui">نعم</option>
                                </select><br />

                                <label >عدد الأشخاص المتكفل بهم</label><br />
                                <label htmlFor="numb_p"></label>
                                <input type="number" name="numb_p" /><br />
                            </div>
                        </div>    
                        

                       

                        
                        
                        
                        
                        <input type="submit" value="حفظ" />  
                        <input type="reset" value="إلغاء" />

                    </form>
                    <Person 
                        demande_type={false} 
                        title="الرجاء إدخال بيانات الزوج(ة)" 
                        hidden={this.state.hide_conj} 
                    />
                </div>
            );
        }else{
            // console.log(usertype);
            return <Redirect to="/Login" />;
        }
    }   
    
}

export default withRouter( Dossier);