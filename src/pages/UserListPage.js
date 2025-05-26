import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Spinner, Alert, Form, Row, Col } from 'react-bootstrap';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      setError('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    `${user.lastName} ${user.firstName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const handleDelete = async (email) => {
    if (window.confirm(`Вы уверены, что хотите удалить пользователя ${email}?`)) {
      try {
        await deleteUser(email);
        fetchUsers(); // Обновляем список после удаления
      } catch (error) {
        setError('Ошибка удаления пользователя');
      }
    }
  };
  return (
    <Container className="mt-4">
      <h2>Список пользователей</h2>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Поиск по имени или email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.email}>
                <td>{`${user.lastName} ${user.firstName} ${user.patronymic || ''}`}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      navigate(`/profile/edit?targetEmail=${encodeURIComponent(user.email)}`)
                    }
                    className="me-2"
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.email)}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default UserListPage;