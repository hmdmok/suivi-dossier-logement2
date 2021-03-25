import React from 'react';

const Login = () => {
    return (
        <div className="">
            <form class="container form-signin border shadow p-3 mb-5 bg-body rounded">
                <h1 class="h3 mb-3 font-weight-normal">الرجاء تسجيل الدخول</h1>
                <label for="inputUsername" class="sr-only">اسم المستخدم</label>
                <input type="username" id="inputUsername" class="form-control" placeholder="اسم المستخدم" required="" autofocus="" />
                <label for="inputPassword" class="sr-only">كلمة السر</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="كلمة السر" required="" />
                <button class="btn btn-lg btn-primary btn-block" type="submit">تسجيل الدخول</button>
                <p class="mt-5 mb-3 text-muted">© 2021</p>
            </form>
        </div>
    );
}

export default Login;