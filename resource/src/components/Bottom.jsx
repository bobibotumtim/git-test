import { useState } from "react";
import { Form, Table } from "react-bootstrap";
// import { Link } from "react-router-dom";
func1: login page(/login) xử lý user authentication và role - base access control
    - navigation và route rule:
rootpath(/) hay any invlaid path phải tự động redirect về /login
    - login form:
    chữ signin ở giữa thẻ interface gồm trường cho email(placeholder: email ò student or lecture), pasword(placeholder : "Enter pasword")

- authen và authorization rules:
    validate user credential với tài khoản trong database1.json
hỗ trợ role: students, lecturer
login thành công lưu user sesion dât vào local storage và redirect tới trang Home page(/syllabus)
nếu tài khoản bị inactive,

    access is strictly denied, và hiển thị alert"tài khaonr đã bị khóa"

                func 2: syllabuslist page(/syllabus) hiển thị list subjects, learning material pỏtal
- navigation bar và header: hiển thị top navigation bar chứa portal title: FPT Education Learing MAterial Pỏtal, hiển thị welcome mesage cùng với role của user đã đăng nhập "Hello, tên user (role)" bên cạnh nút logout
import { useAppContext } from "../provider/AppProvider";

const SubjectTable = ({ subjects }) => {
    return (
        <Table responsive borderless hover className="mb-4 align-middle">
            <thead className="table-light">
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
            search và filter
            search by: code (or name) (đây là dropdown) cho phép tìm kiếm theo tên hoặc code khi chọn dropdown
            bên cạnh là thanh search (cingf nút seach)
            subject table và navigation: hiển thị bảng như làm ở phần (Bottom), khi bấm vào Code của any môn, redirect sang trang subjectInfo (/subject/:id)
            <tbody>
                {subjects.map((subject) => (
                    <tr key={subject.id}>
                        <td>{subject.code}</td>
                        <td>
                            <div className="fw-semibold">{subject.name}</div>

                        </td>
                        <td>{subject.curriculum}</td>
                        <td>{subject.semester}</td>
                        <td>{subject.credits}</td>
                        <td>{subject.preRequisites}</td>
                        <td>{subject.description}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

// const RecipeCards = ({ subjects }) => {
//     return (
//         <Row className="g-3">
//             {subjects.map((subject) => (
//                 <Col md={6} key={subject.id}>
//                     <Card className="h-100">
//                         <Card.Img
//                             variant="top"
//                             src={`/images/${subject.image}`}
//                             alt={subject.name}
//                             style={{ height: "200px", objectFit: "cover" }}
//                         />
//                         <Card.Body>
//                             <Card.Title>{subject.name}</Card.Title>
//                             <Card.Text>
//                                 {subject.cuisine} - {subject.difficulty}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             ))}
//         </Row>
//     );
// };

export const Bottom = ({
    selectedSubjects,
    selectedSubjectTypes,
    selectedTags,
}) => {
    const { subjects } = useAppContext();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRecipes = subjects.filter((subject) => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        const matchesSearch = subject.name
            .toLowerCase()
            .startsWith(normalizedSearchTerm);

        const matchesCuisine =
            selectedSubjects.length === 0 ||
            selectedSubjects.includes(subject.cuisine);

        const matchesMealType =
            selectedSubjectTypes.length === 0 ||
            selectedSubjectTypes.some((subjectType) =>
                subject.subjectType.includes(subjectType)
            );

        const matchesTag =
            selectedTags.length === 0 ||
            selectedTags.some((tag) => subject.tags.includes(tag));

        return matchesSearch && matchesCuisine && matchesMealType && matchesTag;
    });

    return (
        <div>
            <Form className="mb-4 mx-auto" style={{ width: "400px", maxWidth: "100%" }}>
                <Form.Control
                    type="search"

                    placeholder="Enter Recipes Name to search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </Form>

            <div className="d-flex justify-content-end mb-3">
                {/* <Button as={Link} to="/subject/create">Create Recipes</Button> */}
            </div>

            {filteredRecipes.length > 0 ? (
                <>
                    <SubjectTable subjects={filteredSubjects} />
                    <RecipeCards subjects={filteredSubjects} />
                </>
            ) : (
                <p className="text-center text-muted">No subjects found.</p>
            )}
        </div>
    );
};
