import './App.css';
import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setUsers(data)
      })
      .catch(error => console.log(error));
  }, []);

  const handleAddUser = () => {
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newUser, email: 'random@email.com', password: 'password' })
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        setNewUser('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </header>
    </div>
  );
}

export default App;
