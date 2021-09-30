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
        }
    }

    onFirstnameChange = (event) => {
        this.setState({firstname: event.target.value,});
    }

    onLastnameChange = (event) => {
        this.setState({lastname: event.target.value,});
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value,});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value,});
    }

    onRepasswordChange = (event) => {
        this.setState({repassword: event.target.value,});
    }

    onUsertypeChange = (event) => {
        this.setState({usertype: event.target.value,});
    }

    onBirthdayChange = (event) => {
        this.setState({birthday: event.target.value,});
    }

    onSubmitUtilisateur = () => {
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
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                // console.log(user);
                this.props.loadUser(user);
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
            <form className="container form-signin border shadow p-3 mt-2 bg-body rounded">
                <h1 className="h3 mb-3 font-weight-normal">الرجاء ادخال معلومات المستخدم</h1>
                <div className= "row text-right">
                    <div className="col order-last">
                        <label htmlFor="inputFirstName" className="text-right">الاسم </label>
                        <input onChange={this.onFirstnameChange} 
                        type="text" 
                        id="inputFirstName" 
                        className="form-control text-right" 
                        placeholder="الاسم " 
                        required="" autoFocus />
                    </div>
                    <div className="col order-first">
                        <label htmlFor="inputLastName" className="text-right">اللقب </label>
                        <input onChange={this.onLastnameChange} 
                        type="name" 
                        id="inputLastName" 
                        className="form-control text-right" 
                        placeholder="اللقب" 
                        required="" autoFocus />
                    </div>
                    
                </div>
                <div className="row text-right">
                    <div className="col">
                        <label htmlFor="inputUsername" className="">اسم المستخدم</label>
                        <input onChange={this.onUsernameChange} type="username" id="inputUsername" className="form-control text-right" placeholder="اسم المستخدم" required = {true} autoFocus />
                    </div>
                </div>
                <div className="row text-right">
                    
                    <div className="col order-last">
                        <label htmlFor="inputPassword" className="">كلمة السر</label>
                        <input onChange={this.onPasswordChange} type="password" id="inputPassword" className="form-control text-right" placeholder="كلمة السر" required={true} />
                    </div>
                    <div className="col">
                        <label htmlFor="inputRepassword" className="">تاكيد كلمة السر</label>
                        <input onChange={this.onRepasswordChange} type="password" id="inputRepassword" className="form-control text-right" placeholder="تاكيد كلمة السر" required={true} />
                    </div>
                </div>
                <div className="row text-right">
                    <div className="col">
                        <label htmlFor="inputUsertype" className="">وظيفة المستخدم</label>
                        <select onChange={this.onUsertypeChange} id="inputUsertype" className="form-control text-right" placeholder="وظيفة المستخدم">
                            <option selected hidden>وظيفة المستخدم</option>
                            <option value="super">مطور</option>
                            <option value="admin">مسير</option>
                            <option value="agent">عون حجز</option>
                        </select>                
                    </div>
                </div>
                <div className="row text-right">
                    <div className="col">
                        <label htmlFor="inputBirthday" className="">تاريخ الميلاد</label>
                        <input onChange={this.onBirthdayChange} type="date" id="inputBirthday" className="form-control text-right" placeholder="تاريخ الميلاد" required="" />
                    </div>
                </div>
                <hr/>
                <div className= "row">
                    <div className="col order-last">
                        <input 
                        onClick={this.onSubmitUtilisateur}
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