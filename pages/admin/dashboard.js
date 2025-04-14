import { useEffect, useState } from 'react';
import styles from '../../styles/Dashboard.module.css';

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/admin')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/${status}-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    alert(`User ${status === 'block' ? 'deleted' : 'accepted'}`);
    // Remove deleted user from state
    if (status === 'block') {
      setUsers(users.filter(user => user._id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Management Dashboard</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Branch</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.mobile}</td>
              <td>{user.email}</td>
              <td>{user.roll}</td>
              <td>{user.branch}</td>
              <td>{user.isVerified ? 'Yes' : 'No'}</td>
              <td>
                <button className={styles.accept} onClick={() => updateStatus(user._id, 'accept')}>Accept</button>
                <button className={styles.block} onClick={() => updateStatus(user._id, 'block')}>Block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
