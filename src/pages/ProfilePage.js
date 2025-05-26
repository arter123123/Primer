import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { Container, Card, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Ошибка загрузки профиля');
        logout(); // Выход при ошибке загрузки
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [logout, navigate]); // Добавлены зависимости в useEffect

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!profile || !user) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Профиль не найден</Alert>
        <Button onClick={() => navigate('/login')}>Войти снова</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Профиль пользователя</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Email:</strong> {user.id}</p>
                  <p><strong>Адрес:</strong> {profile.address || 'Не указан'}</p>
                  <p><strong>Телефон:</strong> {profile.phoneNumber || 'Не указан'}</p>
                </Col>
              </Row>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={() => navigate('/profile/edit')}
                >
                  Редактировать профиль
                </Button>
                {user.role === 'DOCTOR' && (
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/examinations/doctor')}
                  >
                    Мои обследования
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;