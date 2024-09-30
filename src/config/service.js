import {SERVICE, fetchWithErrorHandling} from "@/config/constants";


// Obtener Servicios
export const getServices = async () => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
  // Editar servicios
  export const putService = async (id, data) => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
  };
  
  // Eliminar servicios
  export const deleteService = async (id) => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };
  
  // Crear servicios
  export const postService = async (data) => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };
