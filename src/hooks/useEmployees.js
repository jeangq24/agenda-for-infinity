import { useUser } from "@/config/UserContext";
import { useState, useEffect, useCallback } from "react";
import { getEmployees, postEmployee, deleteEmployee, putEmployee } from "@/config/employee";
import { useSocket } from "@/config/socketContext";

export const useEmployees = (initialEmployees) => {
  const { user } = useUser();
  const socketClient = useSocket();
  const [employees, setEmployees] = useState(initialEmployees || []);

  // Función para manejar la obtención de empleados
  const requestEmployees = useCallback(async () => {
    await getEmployees();
  }, []);

  // Manejo de edición de empleados
  const editEmployee = useCallback(async (idEmployee, data) => {
    const result = await putEmployee(idEmployee, data);
    return result;
  }, []);

  // Manejo de eliminación de empleados
  const dltEmployee = useCallback(async (idEmployee) => {
    const result = await deleteEmployee(idEmployee);
    return result;
  }, []);

  // Manejo de creación de empleados
  const addEmployee = useCallback(async (data) => {
    const result = await postEmployee(data);
    return result;
  }, []);

  useEffect(() => {
    if (user) {
      // Evento de socket para actualizar la lista de empleados
      socketClient.on("getUsersList", (employees) => {
        setEmployees(employees || []);
      });

      // Petición inicial de empleados si la lista está vacía
      if (employees.length === 0) {
        requestEmployees();
      }

      // Limpieza del evento cuando se desmonta el componente
      return () => {
        socketClient.off("getUsersList");
      };
    }
  }, [user, socketClient]);

  return { employees, editEmployee, dltEmployee, addEmployee };
};
