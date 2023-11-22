import { useContext } from 'react';
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { loginInfo, updateLoginInfo, loginUser, error } =
        useContext(AuthContext);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        updateLoginInfo({ ...loginInfo, [name]: value });
    };
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row
                    style={{
                        height: '100vh',
                        justifyContent: 'center',
                        paddingTop: '10%'
                    }}
                >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h1>Login</h1>
                            <Form.Control
                                id="email"
                                name="email"
                                value={loginInfo.email}
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                onChange={handleInput}
                            />
                            <Form.Control
                                id="password"
                                name="password"
                                value={loginInfo.password}
                                onChange={handleInput}
                                type="password"
                                placeholder="password"
                                autoComplete="off"
                            />
                            <Button type="submit">Login</Button>
                            {error?.message && (
                                <Alert variant="danger">
                                    <p>{error.message}</p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Login;
