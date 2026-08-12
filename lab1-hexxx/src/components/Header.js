import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import logo from "../images/logo.jpg";


function Headers() {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
                <img className="logo" src="/images/logo.jpg" alt="Logo"  />

                <Navbar.Toggle aria-controls="main-nav" />

                <Navbar.Collapse id="main-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#product">Products</Nav.Link>
                        <Nav.Link href="#men">Men</Nav.Link>
                        <Nav.Link href="#women">Women</Nav.Link>
                        <Nav.Link href="#reservation">Contact</Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <Button variant="outline-warning" className="ms-2">
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Headers;
