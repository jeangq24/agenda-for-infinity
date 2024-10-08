import { USER, fetchWithErrorHandling } from "@/config/constants";

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
