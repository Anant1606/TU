import React, { useState } from 'react';
import axios from 'axios';

const FilterUsers = () => {
  const [formData, setFormData] = useState({
    department: '',
    year: '',
    paper: '',
    awardingAgency: '',
    combinedFilters: false,
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/filter/filter-users', {
        params: formData,
      });
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.filterContainer}>
      <h1 style={styles.heading}>Filter Users</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Department Input */}
        <div>
          <label style={styles.label}>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department"
            style={styles.input}
          />
        </div>

        {/* Year Input */}
        <div>
          <label style={styles.label}>Year:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter year"
            style={styles.input}
          />
        </div>

        {/* Paper Input */}
        <div>
          <label style={styles.label}>Paper:</label>
          <input
            type="text"
            name="paper"
            value={formData.paper}
            onChange={handleChange}
            placeholder="Enter paper"
            style={styles.input}
          />
        </div>

        {/* Awarding Agency Input */}
        <div>
          <label style={styles.label}>Awarding Agency:</label>
          <input
            type="text"
            name="awardingAgency"
            value={formData.awardingAgency}
            onChange={handleChange}
            placeholder="Enter awarding agency"
            style={styles.input}
          />
        </div>

        {/* Combined Filters Checkbox */}
        <div>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="combinedFilters"
              checked={formData.combinedFilters}
              onChange={handleChange}
            />
            Combined Filters
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>Filter Users</button>
      </form>

      {/* Display Loading or Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Display Users */}
      <div style={styles.userList}>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user._id} style={styles.userItem}>{user.name}</li>
            ))}
          </ul>
        ) : (
          !loading && <p>No users found</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  filterContainer: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  checkboxLabel: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '5px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  userList: {
    marginTop: '20px',
  },
  userItem: {
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#e9e9e9',
    borderRadius: '4px',
    fontSize: '16px',
  },
};

export default FilterUsers;
