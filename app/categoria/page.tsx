"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriaPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [newCategoria, setNewCategoria] = useState('');

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/categoria`);
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
    }
  };

  const createCategoria = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/categoria`, { name: newCategoria });
      setNewCategoria('');
      fetchCategorias();
    } catch (error) {
      console.error('Error creating categoria:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Categorias</h1>
      <form onSubmit={createCategoria} className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={newCategoria}
          onChange={(e) => setNewCategoria(e.target.value)}
          placeholder="Nombre de la Categoria"
          className="border border-gray-300 rounded-xl p-3 w-full sm:w-2/3 focus:outline-none focus:border-blue-500"
          required
          aria-label="Nombre de la Categoria"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-xl px-6 py-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Crear Categoria
        </button>
      </form>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(categorias ?? []).map((categoria) => (
          <li
            key={categoria.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            aria-label={`Categoria ${categoria.name}`}
          >
            {categoria.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaPage;