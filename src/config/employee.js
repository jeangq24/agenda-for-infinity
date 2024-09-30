import { USER } from "@/config/index";
import toast from "react-hot-toast";

// Función general para manejar las peticiones
const fetchWithErrorHandling = async (url, options) => {
  try {
    const response = await fetch(url, { credentials: "include", ...options });
    const result = await response.json();
    if (result?.error) {
      toast.error(result.error);
      return null;
    }
    return result;
  } catch (error) {
    console.error(`${options.method} request failed:`, error);
    return false;
  }
};

// Obtener empleados
export const getEmployees = async () => {
  return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${USER}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};

// Editar empleado
export const putEmployee = async (id, data) => {
  return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${USER}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...data }),
  });
};

// Eliminar empleado
export const deleteEmployee = async (id) => {
  return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${USER}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
};

// Crear empleado
export const postEmployee = async (data) => {
  return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${USER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
