"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NotaPage = () => {
  const [notas, setNotas] = useState([]);
  const [newNota, setNewNota] = useState({ title: '', content: '', category: '' });
  const router = useRouter();

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/nota`);
      setNotas(response.data);
    } catch (error) {
      console.error('Error fetching notas:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewNota({ ...newNota, [e.target.name]: e.target.value });
  };

  const createNota = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/nota`, newNota);
      setNewNota({ title: '', content: '', category: '' });
      fetchNotas();
    } catch (error) {
      console.error('Error creating nota:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notas</h1>
      <form onSubmit={createNota} className="mb-4">
        <input
          type="text"
          name="title"
          value={newNota.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          name="content"
          value={newNota.content}
          onChange={handleInputChange}
          placeholder="Content"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="category"
          value={newNota.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Create Nota</button>
      </form>
      <ul>
        {(notas ?? []).map((nota) => (
          <li key={nota.id} className="border p-2 mb-2">
            <h2 className="font-bold">{nota.title}</h2>
            <p>{nota.content}</p>
            <p className="text-sm text-gray-500">Category: {nota.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotaPage;
