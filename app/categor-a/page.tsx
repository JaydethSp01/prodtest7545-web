"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriaPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');

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

  const createCategoria = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/categoria`, {
        nombre,
      });
      fetchCategorias();
      setNombre('');
    } catch (error) {
      console.error('Error creating categoria:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={createCategoria} className="bg-blue-500 text-white p-2 rounded">Agregar Categoría</button>
      </div>
      <ul>
        {(categorias ?? []).map((categoria) => (
          <li key={categoria.id} className="border-b p-2">
            <h2 className="font-bold">{categoria.nombre}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaPage;