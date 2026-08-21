import { Alert, Badge, Card, Container, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Top from "../Top";
import { useAppContext } from "../../provider/AppProvider";

const SubjectInfo = () => {
  const { id } = useParams();
  const { subjects, subjectsLoading, subjectsError } = useAppContext();
  const subject = subjects.find((item) => String(item.id) === String(id));

  return (
    <div className="portal-page">
      <Top />
      <Container className="py-4 py-md-5">
        {/* {/* <Link to="/syllabus" className="back-link">
          ← Back to Subject List
        </Link> */}

        {/* {subjectsLoading ? (
          <div className="text-center py-5">
            <Spinner className="me-2" /> Loading subject...
          </div>
        ) : subjectsError ? (
          <Alert variant="danger" className="mt-4">
            {subjectsError}
          </Alert>
        ) : !subject ? (
          <Alert variant="warning" className="mt-4">
            Subject not found.
          </Alert>
        ) : (
          <Card className="subject-detail-card border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <Badge className="subject-badge">{subject.code}</Badge>
                <span className="text-secondary">Semester {subject.semester}</span>
              </div>
              <h1>{subject.name}</h1>
              <p className="detail-description">{subject.description}</p>

              <dl className="subject-metadata">
                <div>
                  <dt>Curriculum</dt>
                  <dd>{subject.curriculum}</dd>
                </div>
                <div>
                  <dt>Credits</dt>
                  <dd>{subject.credits}</dd>
                </div>
                <div>
                  <dt>Pre-requisites</dt>
                  <dd>
                    {subject.preRequisites?.length
                      ? subject.preRequisites.join(", ")
                      : "None"}
                  </dd>
                </div>
              </dl>
            </Card.Body>
          </Card>
        )} */}
      </Container>
    </div>
  );
};

export default SubjectInfo;
