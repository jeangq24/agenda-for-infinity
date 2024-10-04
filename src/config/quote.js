import { QUOTE, fetchWithErrorHandling } from "@/config/constants";

// Crear empleado
export const postQuote = async (data) => {
    return await fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${QUOTE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };