import React from 'react';

class Utilisateur extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            repassword: '',
            usertype: '',
            birthday: '',
            remark: '',
        }
    }

    onHandleChange = (event) => {
        this.setState({[event.target.name]: event.target.value,});
    }

    onSubmitUtilisateur = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.repassword){
            alert("كلمة السر غير متطابقة");
        }else{
            fetch('http://localhost:3005/Utilisateur', {
                method: 'post',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    firstname: this.state.firstname,
                    lastname:  this.state.lastname,
                    username:  this.state.username,
                    password:  this.state.password,
                    usertype:  this.state.usertype,
                    birthday:  this.state.birthday,
                    creator: this.props.getUsername(),
                    remark:  this.state.remark,
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.props.setAuthent(true);
                    this.props.setUsertype(user.usertype);
                    this.props.history.push("/DisplayForm");
                }
                // else{
                //     this.props.setAuthent(false);
                //     this.props.setUsertype('');
                // }
            });
        }
       
    }
 
    render(){
        return (
            <form 
                onSubmit={this.onSubmitUtilisateur} 
                className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded"
                >
                <h1>الرجاء ادخال معلومات المستخدم</h1>
                <div className= "row text-right">
                    <div className="col order-last">
                        <label htmlFor="inputFirstName" className="text-right">الاسم </label>
                        <input 
                            name="firstname"
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="inputFirstName" 
                            className="form-control text-right" 
                            placeholder="الاسم " 
                            autoFocus 
                        />
                    </div>
                    <div className="col order-first">
                        <label htmlFor="inputLastName" className="text-right">اللقب </label>
                        <input 
                            name="lastname"
                            onChange={this.onHandleChange} 
                            type="name" 
                            id="inputLastName" 
                            className="form-control text-right" 
                            placeholder="اللقب" 
                             
                        />
                    </div>
                    
                </div>
                <div className="row text-right">
                    <div className="col">
                        <label htmlFor="inputUsername" className="">اسم المستخدم</label>
                        <input 
                            name="username" 
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="inputUsername" 
                            className="form-control text-right" 
                            placeholder="اسم المستخدم" 
                            required  
                        />
                    </div>
                </div>
                <div className="row text-right">
                    
                    <div className="col order-last">
                        <label htmlFor="inputPassword" className="">كلمة السر</label>
                        <input 
                            name="password"
                            onChange={this.onHandleChange} 
                            type="password" 
                            id="inputPassword" 
                            className="form-control text-right" 
                            placeholder="كلمة السر" 
                            required 
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="inputRepassword" className="">تاكيد كلمة السر</label>
                        <input 
                            name="repassword"
                            onChange={this.onHandleChange} 
                            type="password" 
                            id="inputRepassword" 
                            className="form-control text-right" 
                            placeholder="تاكيد كلمة السر" 
                            required 
                        />
                    </div>
                </div>
                <div className="row text-right">
                    <div className="col">
                        <label htmlFor="inputUsertype" className="">وظيفة المستخدم</label>
                        <select 
                            name="usertype"
                            onChange={this.onHandleChange} 
                            id="inputUsertype" 
                            className="form-control text-right" 
                            placeholder="وظيفة المستخدم"
                            defaultValue="-1"
                            required>

                            <option value="-1" disabled hidden>وظيفة المستخدم</option>
                            <option value="super">مطور</option>
                            <option value="admin">مسير</option>
                            <option value="agent">عون حجز</option>
                        </select>                
                    </div>
                </div>
                <div className="row text-right">
                    <div className="col">
                        <label htmlFor="inputBirthday" className="">تاريخ الميلاد</label>
                        <input 
                            name="birthday"
                            onChange={this.onHandleChange} 
                            type="date" 
                            id="inputBirthday" 
                            className="form-control text-right" 
                            placeholder="تاريخ الميلاد"
                            required
                        />
                    </div>
                </div>
                <div className="row text-right">
                    <div className="col">
                        <label htmlFor="inpuRemark" className="">ملاحظات </label>
                        <input 
                            name="remark"
                            onChange={this.onHandleChange} 
                            type="text" 
                            id="inputRemark" 
                            className="form-control text-right" 
                            placeholder="ملاحظات " 
                        />
                    </div>
                </div>
                <hr/>
                <div className= "row">
                    <div className="col order-last">
                        <input 
                            className="btn btn-lg btn-primary btn-block" 
                            type="submit"
                            value="  تسجيل الدخول"
                        />
                    </div>
                    <div className="col">
                        <input 
                            className="btn btn-lg btn-primary btn-block" 
                            type="reset"
                            value="تراجع"
                        />
                       
                    </div>
                    
                    
                </div>
                
                
                <p className="mt-5 mb-3 text-muted">© 2021 hmdmok</p>
            </form>
        );
    }
}

export default Utilisateur;