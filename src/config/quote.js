import { QUOTE, fetchWithErrorHandling } from "@/config/constants";

// Crear cita
export const postQuote = async (data) => {
  return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${QUOTE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

//Editar Cita
export const putQuote = async (id, data) => {
  return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${QUOTE}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({quoteId: id, ...data}),
  });
};