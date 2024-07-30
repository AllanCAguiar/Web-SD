"use client";
import React, { useState } from "react";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDb, setSelectedDb] = useState<string | null>("1");
  const [message, setMessage] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDb(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:9000/api/users/${selectedDb}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const result = await res.json();
      setMessage(result.message || "Usuário criado com sucesso");
    } catch (error) {
      setMessage("Erro criando usuário");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Criação de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
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
        <div className="form-group mt-3">
          <label>BD:</label>
          <div className="form-check">
            <input
              id="db1"
              type="radio"
              className="form-check-input"
              value="1"
              checked={selectedDb === "1"}
              onChange={handleRadioChange}
            />
            <label htmlFor="db1" className="form-check-label">
              DB1
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              id="db2"
              type="radio"
              className="form-check-input"
              value="2"
              checked={selectedDb === "2"}
              onChange={handleRadioChange}
            />
            <label htmlFor="db2" className="form-check-label">
              DB2
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Criar Usuário
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default CreateUser;
