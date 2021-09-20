import React from 'react';

class Utilisateur extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            repassword: '',
            usertype: '',
            birthday: '',
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value,});
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
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
                repassword: this.state.repassword,
                usertype: this.state.usertype,
                birthday: this.state.birthday,
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
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
            <div className="container form-signin border shadow p-3 mb-5 bg-body rounded">
                <h1 className="h3 mb-3 font-weight-normal">الرجاء ادخال معلومات المستخدم</h1>

                <label htmlFor="inputName" className="sr-only">الاسم الكامل</label>
                <input onChange={this.onNameChange} type="name" id="inputName" className="form-control text-right" placeholder="الاسم الكامل" required="" autoFocus />

                <label htmlFor="inputUsername" className="sr-only">اسم المستخدم</label>
                <input onChange={this.onUsernameChange} type="username" id="inputUsername" className="form-control text-right" placeholder="اسم المستخدم" required = {true} autoFocus />

                <label htmlFor="inputPassword" className="sr-only">كلمة السر</label>
                <input onChange={this.onPasswordChange} type="password" id="inputPassword" className="form-control text-right" placeholder="كلمة السر" required={true} />

                <label htmlFor="inputRepassword" className="sr-only">تكرير كلمة السر</label>
                <input onChange={this.onRepasswordChange} type="password" id="inputRepassword" className="form-control text-right" placeholder="تكرير كلمة السر" required={true} />

                <label htmlFor="inputUsertype" className="sr-only">وظيفة المستخدم</label>
                <select onChange={this.onUsertypeChange} id="inputUsertype" className="form-control text-right" placeholder="وظيفة المستخدم">
                    <option selected hidden>وظيفة المستخدم</option>
                    <option value="super">مطور</option>
                    <option value="admin">مسير</option>
                    <option value="agent">عون حجز</option>
                </select>                
                {/* <input onChange={this.onUsertypeChange} type="list" id="inputUsertype" className="form-control" placeholder="وظيفة المستخدم" required="" /> */}

                <label htmlFor="inputBirthday" className="sr-only">تاريخ الميلاد</label>
                <input onChange={this.onBirthdayChange} type="date" id="inputBirthday" className="form-control" placeholder="تاريخ الميلاد" required="" />

                <button 
                    onClick={this.onSubmitUtilisateur}
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit"
                >
                    تسجيل الدخول
                </button>
                <button 
                    className="btn btn-lg btn-primary btn-block" 
                    type="reset"
                >
                    تراجع
                </button>
                <p className="mt-5 mb-3 text-muted">© 2021</p>
            </div>
        );
    }
}

export default Utilisateur;