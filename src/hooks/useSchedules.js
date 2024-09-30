import { useUser } from "@/config/UserContext";
import { useState, useEffect, useCallback } from "react";
import { getSchedules, putSchedule, deleteSchedule, postSchedule } from "@/config/schedule";
import { useSocket } from "@/config/socketContext";

export const useSchedules = (initialSchedules) => {
    const { user } = useUser();
    const socketClient = useSocket();
    const [schedules, setSchedules] = useState(initialSchedules || []);

    // Función para manejar la obtención de horarios
    const requestSchedules = useCallback(async () => {
        await getSchedules();
    }, []);

    // Manejo de edición de horarios
    const editSchedule = useCallback(async (idSchedule, data) => {
        const result = await putSchedule(idSchedule, data);
        return result;
    }, []);

    // Manejo de eliminación de horarios
    const dltSchedule = useCallback(async (idSchedule) => {
        const result = await deleteSchedule(idSchedule);
        return result;
    }, []);

    // Manejo de creación de horarios
    const addSchedule = useCallback(async (data) => {
        const result = await postSchedule(data);
        return result;
    }, []);

    useEffect(() => {
        if (user) {
            socketClient.on("getScheduleList", (schedules) => {
                setSchedules(schedules || []);
            });

            if (schedules.length === 0) {
                requestSchedules();
            };

            return () => {
                socketClient.off("getScheduleList");
            };
        };

    }, [user, socketClient]); // El arreglo vacío [] asegura que esto solo se ejecute al montar/desmontar el componente

    return { schedules, editSchedule, dltSchedule, addSchedule, addSchedule };
};
