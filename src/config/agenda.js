import { AGENDA, fetchWithErrorHandling } from "@/config/constants";

// Obtener agendas con empleados, horarios y citas
export const getEmployeesAgenda = async () => {
  return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${AGENDA}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};
