import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { menuItems } from "../data";

function MenuSection() {
  return (
    <section id="menu" className="menu-section">
      <Container>
        <h2 className="section-title">Our Menu</h2>

        <Row className="g-4">
          {menuItems.map((item, index) => (
            <Col sm={6} lg={3} key={item.id}>
              <Card className="h-100 menu-card">
                {index < 2 && (
                  <Badge bg="warning" text="dark" className="sale-badge">
                    SALE
                  </Badge>
                )}

                <Card.Img variant="top" src={item.image} alt={item.name} />

                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text className="mb-3">
                    Price: ${item.price}
                  </Card.Text>
                  <Button variant="dark" className="mt-auto w-100">
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default MenuSection;
