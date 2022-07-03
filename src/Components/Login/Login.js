import React from 'react';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: ''
        }
    }



    onHandleChange = (event) => {
        this.setState({[event.target.name]: event.target.value,});
    }

    onSubmitLogin = (event) => {
        event.preventDefault();
        fetch('https://sdl-api.herokuapp.com/Login', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                username: this.state.loginUsername,
                password: this.state.loginPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.auth === 'Success'){
                this.props.loadUser(data.user);
                this.props.setAuthent(true);
                this.props.setUsertype(data.usertype);
                this.props.history.push("/DisplayForm");
            }else{
                this.props.setAuthent(false);
                this.props.setUsertype('');
            }
        }).catch(err => console.log(err));
           
    }
 
    render(){
        return (
            <form
                onSubmit={this.onSubmitLogin} 
                className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">

                <h1 className="h3 mb-3 font-weight-normal">الرجاء تسجيل الدخول</h1>
                <label htmlFor="inputUsername" className="sr-only">اسم المستخدم</label>
                <input 
                    name="loginUsername"
                    onChange={this.onHandleChange} 
                    type="username" 
                    id="inputUsername" 
                    className="form-control text-right" 
                    placeholder="اسم المستخدم" 
                    required
                    autoFocus 
                />
                <label htmlFor="inputPassword" className="sr-only">كلمة السر</label>
                <input 
                    name="loginPassword"
                    onChange={this.onHandleChange} 
                    type="password" 
                    id="inputPassword" 
                    className="form-control text-right" 
                    placeholder="كلمة السر" 
                    required
                />
                <hr/>
                <button 
                    
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit"
                >
                    تسجيل الدخول
                </button>
                <p className="mt-5 mb-3 text-muted">© 2021</p>
            </form>
        );
    }
}

export default Login;