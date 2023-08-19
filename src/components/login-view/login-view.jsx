import React from "react";
import { useState } from "react";
import {Form, Container, Button, Row, Col, Card} from "react-bootstrap";


export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://m-flix-816a8a9c4a76.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", JSON.stringify(data.token));
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No user was found.");
                }
            }).catch ((e) => {
                alert("Something went wrong.")
            });
    };

    return (
            <Card className="mt-3" style={{border: "1px solid green"}}>
                
                <Card.Title>Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                            controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength="3"
                                placeholder="Enter your username"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group>
                        <Button
                            className="mt-2"
                            variant="primary"
                            type="submit"
                            >
                            Submit
                        </Button>
                        </Form.Group>
                    </Form>
            </Card>

    );
};