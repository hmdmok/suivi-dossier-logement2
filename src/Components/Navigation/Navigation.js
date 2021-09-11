import React from 'react';
import { Navbar,Nav,NavDropdown,Button,Form } from 'react-bootstrap';
import apartment from './apartment.png';

const Navigation = ({onRouteChange}) => {
    return (
        <Navbar className="row d-flex flex-row-reverse " bg="light" expand="lg">
            <Navbar.Brand href="#home"><img src={apartment} alt="logo" width="50" height="50" /></Navbar.Brand>
            {/* <Navbar.Brand href="#home">متابعة طلبات السكن</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="row d-flex flex-row-reverse justify-content-between mr-3" id="basic-navbar-nav">
                <Nav className="row d-flex flex-row-reverse  mr-3">
                    <NavDropdown title="تسيير الملف" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">تسجيل طالب سكن</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">حجز ملف طلب السكن</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">ملف طلب السكن الرقمي</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">تحيين ملف طلب السكن</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">قائمة ملفات طلب السكن</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">تسجيل خروج</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">تغيير المستخدم</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="تسيير الدراسة" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.3">محاضر الحصص</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">محاضر الاستفادة</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">قائمة تحقيق CNL</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">قائمة تحقيق CNAS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">قائمة تحقيق CASNOS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">قائمة المستفيدين</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    <NavDropdown title="تسيير البيانات" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.3">استيراد بيانات طالبي السكن</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    <NavDropdown title="تسيير المستخدمين" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.3">قائمة المستخدمين</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">تسيير المستخدمين</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                    <NavDropdown title="اعدادات" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">اعدادات العرض</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#help">مساعدة</Nav.Link>
                </Nav>
                <Form inline>
                    <Button 
                        onClick={() => onRouteChange('Login')} 
                        className="m-2" 
                        variant="outline-success"
                        >تسجيل خروج</Button>
                    <Button className="m-2" variant="outline-success">اتصل بنا</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Navigation;