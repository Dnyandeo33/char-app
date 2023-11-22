import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';

import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import Chat from './pages/Chat';
import Login from './pages/login';
import Registration from './pages/registration';

const App = () => {
    const { user } = useContext(AuthContext);
    return (
        <ChatContextProvider user={user}>
            <NavigationBar />
            <Container>
                <Routes>
                    <Route path="/" element={user ? <Chat /> : <Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route
                        path="/login"
                        element={user ? <Chat /> : <Login />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Container>
        </ChatContextProvider>
    );
};

export default App;
