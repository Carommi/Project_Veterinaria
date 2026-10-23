import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export async function listarMascotas() {
  const respuesta = await api.get('/mascotas');
  return respuesta.data;
}

export async function consultarMascota(id) {
  const respuesta = await api.get(`/mascotas/${id}`);
  return respuesta.data;
}

export async function crearMascota(datos) {
  const respuesta = await api.post('/mascotas', datos);
  return respuesta.data;
}

export async function editarMascota(id, datos) {
  const respuesta = await api.put(`/mascotas/${id}`, datos);
  return respuesta.data;
}

export async function eliminarMascota(id) {
  const respuesta = await api.delete(`/mascotas/${id}`);
  return respuesta.data;
}

