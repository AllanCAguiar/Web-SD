"use client";
import React, { useState } from 'react';

const ManageUser = () => {
  const [email, setEmail] = useState('');
  const [db, setDb] = useState<number>(1);
  const [message, setMessage] = useState('');

  const handleCheck = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/users/${email}`);
        console.log(res)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const result = await res.json();
      setMessage(result);
    } catch (error) {
      console.error(error);
      setMessage('Error checking user');
    }
  };
  

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/users/${db}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      setMessage(result.message || 'User removed successfully');
    } catch (error) {
        console.log(error)
      setMessage('Error removing user');
    }
  };

  return (
    <div>
      <h1>Manage User</h1>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Database (1 or 2):</label>
        <input 
          type="number" 
          value={db} 
          onChange={(e) => setDb(Number(e.target.value))} 
          required 
        />
      </div>
      <button onClick={handleCheck}>Check User</button>
      <button onClick={handleDelete}>Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ManageUser;
