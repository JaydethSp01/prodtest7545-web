"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsuarioPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({ username: '', email: '' });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/usuario`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const createUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/usuario`, newUsuario);
      setNewUsuario({ username: '', email: '' });
      fetchUsuarios();
    } catch (error) {
      console.error('Error creating usuario:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <form onSubmit={createUsuario} className="mb-4">
        <input
          type="text"
          name="username"
          value={newUsuario.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={newUsuario.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Create Usuario</button>
      </form>
      <ul>
        {(usuarios ?? []).map((usuario) => (
          <li key={usuario.id} className="border p-2 mb-2">
            <h2 className="font-bold">{usuario.username}</h2>
            <p>{usuario.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioPage;
