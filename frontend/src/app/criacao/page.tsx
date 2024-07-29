"use client";
import React, { useState } from 'react';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [db, setDb] = useState<number>(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:9000/api/users/${db}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await res.json();
      setMessage(result.message || 'User created successfully');
    } catch (error) {
        console.log(error)
      setMessage('Error creating user');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Database (1 or 2):</label>
          <input type="number" value={db} onChange={(e) => setDb(Number(e.target.value))} required />
        </div>
        <button type="submit">Create User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
