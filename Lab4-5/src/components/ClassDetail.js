import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./ClassDetail.css";

function CourseDetail({ courses, error, onDeleteCourse, onRetry, onToggleClass }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const course = courses.find((item) => String(item.id) === id);
  const returnTo = location.state?.from ?? "/courses";
  const defaultClassId =
    course?.classes?.find((item) => item.status === "active")?.classId ??
    course?.classes?.[0]?.classId ??
    "";
  const [selectedClassId, setSelectedClassId] = useState(defaultClassId);
  const [showRequirements, setShowRequirements] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionError, setActionError] = useState("");

  const selectedClass = course?.classes?.find(
    (item) => item.classId === selectedClassId
  );

  const requirements = useMemo(
    () =>
      (selectedClass?.slots ?? []).flatMap((slot) =>
        (slot.questions ?? slot.assignments ?? []).map((text) => ({
          slotNumber: slot.slotNumber,
          text,
        }))
      ),
    [selectedClass]
  );

  if (!course) {
    return (
      <main className="detail-page page-container">
        <section className="detail-message">
          <h1>{error ? "Unable to load course" : "Course not found"}</h1>
          <p>{error || "The requested course does not exist."}</p>
          <div className="detail-message-actions">
            <Link to="/courses">← Back to My Courses</Link>
            {error && (
              <button type="button" onClick={onRetry}>
                Try again
              </button>
            )}
          </div>
        </section>
      </main>
    );
  }

  const handleDelete = async () => {
    setActionError("");
    try {
      const deleted = await onDeleteCourse(course.id);
      if (deleted) navigate("/courses", { replace: true });
    } catch (requestError) {
      setActionError("Could not delete this course. Please try again.");
    }
  };

  const handleToggle = async () => {
    if (!selectedClass) return;
    setActionError("");
    setIsUpdating(true);
    try {
      await onToggleClass(course.id, selectedClass.classId);
    } catch (requestError) {
      setActionError("Could not update the class status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const isActive = selectedClass?.status === "active";

  return (
    <main className="detail-page page-container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/courses">My Courses</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{course.nameEn}</span>
      </nav>

      <header className="detail-header">
        <div>
          <p className="detail-code">{course.code}</p>
          <h1>{course.nameEn}</h1>
        </div>

        <label className="class-select">
          <span>Selected class</span>
          <select
            value={selectedClassId}
            onChange={(event) => {
              setSelectedClassId(event.target.value);
              setShowRequirements(false);
            }}
            disabled={!course.classes?.length}
          >
            {!course.classes?.length && <option value="">No class</option>}
            {(course.classes ?? []).map((classItem) => (
              <option value={classItem.classId} key={classItem.classId}>
                {classItem.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="action-toolbar" aria-label="Course actions">
        <Link className="action-button" to={returnTo}>
          ← Back
        </Link>
        <button
          className="action-button"
          type="button"
          onClick={() => setShowRequirements((current) => !current)}
          aria-expanded={showRequirements}
          aria-controls="requirements"
        >
          Requirements ({requirements.length})
        </button>
        <button
          className="action-button action-button--delete"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="action-button action-button--toggle"
          type="button"
          onClick={handleToggle}
          disabled={!selectedClass || isUpdating}
        >
          {isUpdating ? "Updating..." : isActive ? "Close class" : "Open class"}
        </button>
      </section>

      {actionError && <p className="detail-error" role="alert">{actionError}</p>}

      {showRequirements && (
        <section className="requirements" id="requirements">
          <h2>Requirements</h2>
          {requirements.length ? (
            <ul>
              {requirements.map((item, index) => (
                <li key={`${item.slotNumber}-${index}`}>
                  Slot {item.slotNumber}: {item.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>No requirements for this class.</p>
          )}
        </section>
      )}
    </main>
  );
}

export default CourseDetail;
