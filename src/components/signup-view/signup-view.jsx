import { useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://m-flix-816a8a9c4a76.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json"}
        }).then((response) => {
            if (response.ok) {
                alert("Signup sussesful!");
                window.location.reload();
            } else {
                alert("Signup failed.");
            }
        });
    };

    return (
      <Card className="mt-3" style={{border: "1px solid green"}}>
        <Card.Title>Registration</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
          <Button
            variant="primary"
            type="submit"
            className="mt-2"
          >
            Submit
          </Button>
          </Form.Group>
        </Form>
      </Card>
    );
};