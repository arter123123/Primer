// Создаем новый файл src/pages/HomePage.js
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="my-4">Добро пожаловать, {user?.firstName}!</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card onClick={() => navigate('/profile')} className="clickable-card">
            <Card.Body>
              <Card.Title>Мой профиль</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        {user?.role === 'ADMIN' && (
          <Col md={4} className="mb-4">
            <Card onClick={() => navigate('/profile/list')} className="clickable-card">
              <Card.Body>
                <Card.Title>Управление пользователями</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default HomePage;