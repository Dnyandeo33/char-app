import { useContext } from 'react';
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Registration = () => {
    const { registerInfo, updateRegisterInfo, registerUser, error, isLoading } =
        useContext(AuthContext);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        updateRegisterInfo({ ...registerInfo, [name]: value });
    };

    return (
        <>
            <Form onSubmit={registerUser}>
                <Row
                    style={{
                        height: '100vh',
                        justifyContent: 'center',
                        paddingTop: '10%'
                    }}
                >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h1>Registration</h1>
                            <Form.Control
                                id="name"
                                name="name"
                                value={registerInfo.name}
                                type="text"
                                placeholder="Name"
                                autoComplete="off"
                                onChange={handleInput}
                            />
                            <Form.Control
                                id="email"
                                name="email"
                                value={registerInfo.email}
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                onChange={handleInput}
                            />
                            <Form.Control
                                id="password"
                                name="password"
                                value={registerInfo.password}
                                onChange={handleInput}
                                type="password"
                                placeholder="password"
                                autoComplete="off"
                            />
                            <Button type="submit">
                                {isLoading
                                    ? 'Creating your account'
                                    : 'Register'}
                            </Button>
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

export default Registration;
