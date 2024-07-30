"use client";
import React, { useEffect, useState } from "react";

const Bd1Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/users/list/1");
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Usuários do bd1</h1>
      <div className="list-group">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{user.name}</h5>
                <p className="mb-0 text-muted">{user.email}</p>
              </div>
              <span className="badge bg-primary rounded-pill">ID: {user.id}</span>
            </div>
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            Nenhum usuário encontrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default Bd1Page;
