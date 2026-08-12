import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

function ReservationForm() {
  const [sent, setSent] = React.useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="reservation" className="reservation-section">
      <Container>
        <h2 className="section-title text-white text-center">
          Book Your Table
        </h2>

        {sent && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setSent(false)}
          >
            Your reservation request has been sent.
          </Alert>
        )}

        <Form onSubmit={submit}>
          <Row className="g-3">
            <Col md={4}>
              <Form.Control required placeholder="Your name *" />
            </Col>

            <Col md={4}>
              <Form.Control
                required
                type="email"
                placeholder="Your email *"
              />
            </Col>

            <Col md={4}>
              <Form.Select required defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>Dine in</option>
                <option>Take away</option>
                <option>Birthday party</option>
              </Form.Select>
            </Col>

            <Col xs={12}>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Please write your comment"
              />
            </Col>

            <Col xs={12}>
              <Button variant="warning" type="submit">
                Send Message
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}

export default ReservationForm;
