import React from 'react';

const Login = ({onRouteChange}) => {
    return (
        <div className="container form-signin border shadow p-3 mb-5 bg-body rounded">
            <h1 className="h3 mb-3 font-weight-normal">الرجاء تسجيل الدخول</h1>
            <label htmlFor="inputUsername" className="sr-only">اسم المستخدم</label>
            <input type="username" id="inputUsername" className="form-control" placeholder="اسم المستخدم" required="" autoFocus />
            <label htmlFor="inputPassword" className="sr-only">كلمة السر</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="كلمة السر" required="" />
            <button 
                onClick={() => onRouteChange('Home')}
                className="btn btn-lg btn-primary btn-block" 
                type="submit"
            >تسجيل الدخول</button>
            <p className="mt-5 mb-3 text-muted">© 2021</p>
        </div>
    );
}

export default Login;