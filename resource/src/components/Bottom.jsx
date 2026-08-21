import { useMemo, useState } from "react";
import { Alert, Button, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../provider/AppProvider";

const SubjectTable = ({ subjects }) => (
  <div className="subject-table-wrapper">
    <Table responsive hover className="subject-table mb-0 align-middle">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Curriculum</th>
          <th>Semester</th>
          <th>Credits</th>
          <th>Pre-requisites</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject) => (
          <tr key={subject.id}>
            <td>
              <Link className="subject-code" to={`/subject/${subject.id}`}>
                {subject.code}
              </Link>
            </td>
            <td className="fw-semibold">{subject.name}</td>
            <td>{subject.curriculum}</td>
            <td className="text-center">{subject.semester}</td>
            <td className="text-center">{subject.credits}</td>
            <td>
              {subject.preRequisites?.length
                ? subject.preRequisites.join(", ")
                : "None"}
            </td>
            <td className="description-cell">{subject.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export const Bottom = () => {
  const { subjects, subjectsLoading, subjectsError, reloadSubjects } =
    useAppContext();
  const [searchBy, setSearchBy] = useState("code");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return subjects;

    return subjects.filter((subject) =>
      String(subject[searchBy] || "")
        .toLowerCase()
        .includes(keyword)
    );
  }, [searchBy, searchTerm, subjects]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  if (subjectsLoading) {
    return (
      <div className="text-center py-5">
        <Spinner className="me-2" /> Loading subjects...
      </div>
    );
  }

  if (subjectsError) {
    return (
      <Alert variant="danger">
        <div>{subjectsError}</div>
        <Button
          variant="outline-danger"
          size="sm"
          className="mt-3"
          onClick={reloadSubjects}
        >
          Try again
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <Form className="search-panel" onSubmit={handleSearch}>
        <Form.Label className="fw-semibold mb-2">Search by</Form.Label>
        <InputGroup>
          <Form.Select
            aria-label="Search by"
            className="search-type"
            value={searchBy}
            onChange={(event) => {
              setSearchBy(event.target.value);
              setSearchTerm("");
              setSearchInput("");
            }}
          >
            <option value="code">Code</option>
            <option value="name">Name</option>
          </Form.Select>
          <Form.Control
            type="search"
            aria-label="Search subjects"
            placeholder={`Enter subject ${searchBy}`}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button type="submit" className="search-button">
            Search
          </Button>
        </InputGroup>
      </Form>

      {/* <div className="result-summary">
        {filteredSubjects.length} subject
        {filteredSubjects.length === 1 ? "" : "s"} found
      </div> */}

      {filteredSubjects.length ? (
        <SubjectTable subjects={filteredSubjects} />
      ) : (
        <div className="empty-state">No subjects found.</div>
      )}
    </>
  );
};
