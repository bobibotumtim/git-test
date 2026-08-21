import { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../provider/AppProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.ok) {
        navigate("/syllabus", { replace: true });
        return;
      }

      if (result.reason === "inactive") {
        const message = "Tài khoản đã bị khóa";
        window.alert(message);
        setError(message);
      } else if (result.reason === "role") {
        setError("This account does not have permission to access the portal.");
      } else {
        setError("Email or password is incorrect.");
      }
    } catch (requestError) {
      setError(
        "Cannot connect to the server. Please start JSON Server on port 9000."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <Card className="login-card border-0 shadow-lg">
        <Card.Body className="p-4 p-md-5">
          <div className="portal-mark" aria-hidden="true">
            FPT
          </div>
          <h1 className="signin-title">Sign In</h1>
          <p className="text-center text-secondary mb-4">
            FPT Education Learning Material Portal
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email of student or lecturer"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button
              className="w-100 signin-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" className="me-2" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default Login;
