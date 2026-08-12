import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

function Footer() {
    const [sent, setSent] = React.useState(false);

    const submit = (event) => {
        event.preventDefault();
        setSent(true);
    };

    return (
        <section id="reservation" className="reservation-section">
            <Container>
                <h2 className="section-title text-white text-center">
                    Trần Quang Hiếu
                </h2>
                <h2 className="section-title text-white text-center">
                    HE194449
                </h2>
                <h2 className="section-title text-white text-center">
                    FER_BLOCK5
                </h2>
                <h2 className="section-title text-white text-center">
                    quanghieuhg2005@gmail.com       
                </h2>


            </Container>
        </section>
    );
}

export default Footer;
