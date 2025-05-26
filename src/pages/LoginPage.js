import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: authenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      authenticate(response.data);
      navigate('/profile');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Вход в систему</h2>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Войти
            </Button>
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={() => navigate('/register')}
            >
              Регистрация
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;