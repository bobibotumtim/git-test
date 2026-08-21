import { Container } from "react-bootstrap";
import Top from "../Top";
import { Bottom } from "../Bottom";

const HomePage = () => (
  <div className="portal-page">
    <Top />
    <Container className="py-4 py-md-5">
      <div className="page-heading">
        <p className="eyebrow mb-2">Learning material portal</p>
        <h1>Subject List</h1>
      </div>
      <Bottom />
    </Container>
  </div>
);

export default HomePage;
