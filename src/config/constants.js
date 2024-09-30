export const SCHEDULE = "schedules";
export const USER = "users";
export const SERVICE = "products";
export const QUOTE = "quotes";
export const AUTH  = {
    AUTH: "auth",
    LOGOUT: "logout",
    CHECKSESSION: "check-session"
};


// Función general para manejar las peticiones
export const fetchWithErrorHandling = async (url, options) => {
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