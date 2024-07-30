"use client";
import React, { useState } from "react";

const ManageUser = () => {
  const [email, setEmail] = useState("");
  const [selectedDb, setSelectedDb] = useState<string | null>("1");
  const [message, setMessage] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDb(event.target.value);
  };

  const handleCheck = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/users/${email}`);
      if (!res.ok) {
        throw new Error(`Erro interno! status: ${res.status}`);
      }

      const result = await res.json();
      setMessage(result);
    } catch (error) {
      console.error(error);
      setMessage("Erro verificando usuário");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Verificação de Usuário</h1>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mt-3">
        <button type="button" className="btn btn-info mr-2" onClick={handleCheck}>
          Verificar Usuário
        </button>
      </div>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ManageUser;
