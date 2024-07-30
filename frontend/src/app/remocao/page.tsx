"use client";
import React, { useState } from "react";

const ManageUser = () => {
  const [email, setEmail] = useState("");
  const [selectedDb, setSelectedDb] = useState<string | null>("1");
  const [message, setMessage] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDb(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/users/${selectedDb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "Usuário removido com sucesso");
      } else {
        setMessage("Erro removendo usuário: " + (result.message || "Erro desconhecido"));
      }
    } catch (error) {
      setMessage("Erro removendo usuário");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Remoção de Usuário</h1>
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
      <div className="mt-3">
        <button type="button" className="btn btn-danger ml-3" onClick={handleDelete}>
          Deletar Usuário
        </button>
      </div>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ManageUser;
