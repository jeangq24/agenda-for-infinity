import {SCHEDULE, fetchWithErrorHandling} from "@/config/constants";


// Obtener Horarios
export const getSchedules = async () => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
  // Editar horario
  export const putSchedule = async (id, data) => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
  };
  
  // Eliminar horario
  export const deleteSchedule = async (id) => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };
  
  // Crear horario
  export const postSchedule = async (data) => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };
