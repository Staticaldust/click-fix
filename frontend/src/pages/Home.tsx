import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  ServerCategory,
  ServerEmployee,
  ServerUser,
  ServerReview,
} from '../types/server.types';

const API_URL = 'http://localhost:3000/api';

export default function Home() {
  const [categories, setCategories] = useState<ServerCategory[]>([]);
  const [users, setUsers] = useState<ServerUser[]>([]);
  const [employees, setEmployees] = useState<ServerEmployee[]>([]);
  const [reviews, setReviews] = useState<ServerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const [categoriesResponse, usersResponse, employeesResponse, reviewsResponse] =
          await Promise.all([
            fetch(`${API_URL}/categories`, { headers }),
            fetch(`${API_URL}/users`, { headers }),
            fetch(`${API_URL}/employees`, { headers }),
            fetch(`${API_URL}/reviews`, { headers }),
          ]);

        if (categoriesResponse.ok) {
          const data = await categoriesResponse.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }

        if (usersResponse.ok) {
          const data = await usersResponse.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }

        if (employeesResponse.ok) {
          const data = await employeesResponse.json();
          setEmployees(data);
        } else {
          console.error('Failed to fetch employees');
        }

        if (reviewsResponse.ok) {
          const data = await reviewsResponse.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <h1>Click-Fix Database Viewer</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span>Welcome, {currentUser?.name || currentUser?.email || 'User'}!</span>
          <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <section>
        <h2>Categories ({categories.length})</h2>
        <div className="grid">
          {categories.map((cat) => (
            <div key={cat.id} className="card">
              <div className="image">{cat.image}</div>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <small>{cat.fatherCategory}</small>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Employees ({employees.length})</h2>
        <div className="grid">
          {employees.map((emp) => (
            <div key={emp.id} className="card">
              <h3>{emp.name}</h3>
              <p>
                <strong>Email:</strong> {emp.email}
              </p>
              <p>
                <strong>Phone:</strong> {emp.phone}
              </p>
              <p>
                <strong>Area:</strong> {emp.area}
              </p>
              <p>
                <strong>Gender:</strong> {emp.gender}
              </p>
              {Array.isArray(emp.categories) && emp.categories.length > 0 && (
                <p>
                  <strong>Categories:</strong> {emp.categories.map((c) => c.name).join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Users ({users.length})</h2>
        <div className="grid">
          {users.map((user) => (
            <div key={user.id} className="card">
              <h3>{user.name || 'User'}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Reviews ({reviews.length})</h2>
        <div className="grid">
          {reviews.map((review) => (
            <div key={review.id} className="card">
              <h4>Review #{review.id}</h4>
              <p>
                <strong>By:</strong> {review.user?.name || 'Unknown'}
              </p>
              <p>
                <strong>For:</strong> {review.employee?.name || 'Unknown'}
              </p>
              <p>
                <strong>Price Rate:</strong> {review.priceRate}/5
              </p>
              <p>
                <strong>Service Rate:</strong> {review.serviceRate}/5
              </p>
              <p>
                <strong>Performance Rate:</strong> {review.performanceRate}/5
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
