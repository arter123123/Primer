import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { Form, Button, Container, Alert, Row, Col, Card } from 'react-bootstrap';

function EditProfilePage() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTargetEmail = queryParams.get('targetEmail') || '';

  const [formData, setFormData] = useState({
    password: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    birthDate: '',
    contactNumber: '',
    email: '',
    role: 'PATIENT'
  });
  const [targetEmail, setTargetEmail] = useState(initialTargetEmail);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfile(targetEmail);
        const { email, lastName, firstName, patronymic, birthDate, contactNumber, role } = response.data;
        setFormData({
          password: '',
          email: email || '',
          lastName: lastName || '',
          firstName: firstName || '',
          patronymic: patronymic || '',
          birthDate: birthDate ? new Date(birthDate).toISOString().split('T')[0] : '',
          contactNumber: contactNumber || '',
          role: role || 'PATIENT'
        });
      } catch (error) {
        setError('Failed to load profile');
      }
    };
    fetchProfileData();
  }, [targetEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = targetEmail ? `/profile/update?targetEmail=${encodeURIComponent(targetEmail)}` : '/profile/update';
      await updateProfile(formData, url);
      alert('Profile updated successfully.');
      navigate('/profile');
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Edit Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password (leave blank to keep current)</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Patronymic</Form.Label>
                      <Form.Control
                        type="text"
                        name="patronymic"
                        placeholder="Patronymic"
                        value={formData.patronymic}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Birth Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {(currentUser?.role === 'ADMIN' || currentUser?.role === 'DOCTOR') && (
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      {currentUser.role === 'ADMIN' ? (
                        <>
                          <option value="PATIENT">Patient</option>
                          <option value="DOCTOR">Doctor</option>
                          <option value="ADMIN">Admin</option>
                        </>
                      ) : (
                        <>
                          <option value="PATIENT">Patient</option>
                          <option value="DOCTOR">Doctor</option>
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                )}

                {!initialTargetEmail && (currentUser?.role === 'ADMIN' || currentUser?.role === 'DOCTOR') && (
                  <Form.Group className="mb-4">
                    <Form.Label>Edit Another User</Form.Label>
                    <Form.Control
                      type="email"
                      name="targetEmail"
                      placeholder="Enter target email"
                      value={targetEmail}
                      onChange={(e) => setTargetEmail(e.target.value)}
                    />
                  </Form.Group>
                )}

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfilePage;