import React from 'react';
import { Navbar,Nav,NavDropdown,Button,Form } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">متابعة طلبات السكن</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="ملف" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">تسجيل طالب سكن</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">حجز ملف طلب السكن</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">تحيين ملف طلب السكن</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">تسيير المستخدمين</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.3">قائمة المستخدمين</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">قائمة ملفات طلب السكن</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">تسجيل خروج</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">تغيير المستخدم</NavDropdown.Item>
                    </NavDropdown>
                    {/* <NavDropdown title="اعدادات" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    </NavDropdown> */}
                    <Nav.Link href="#help">مساعدة</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-success">تسجيل خروج</Button>
                    <Button variant="outline-success">اتصل بنا</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Navigation;