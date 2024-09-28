import { useUser } from "@/config/UserContext";
import { useState, useEffect } from "react";
import { getSchedules, putSchedule, deleteShedule } from"@/config/schedule";
import { useSocket } from "@/config/socketContext";

export const useSchedules = () => {
    const { user } = useUser();
    const socketClient = useSocket();
    const [schedules, setSchedules] = useState([]);
    
    const requestShedules = async () => { 
        await getSchedules();  
    };

    const editSchedule = async(idSchedule, data) => {
        const result = await putSchedule(idSchedule, data);
        return result;
    }

    const dltSchedule = async(idSchedule) => {
        const result = await deleteShedule(idSchedule);
        return result;
    };

    useEffect(() => {
        if(user) {
            socketClient.on("getScheduleList", (schedules)=> {
                setSchedules(schedules || []);
            });

            if(schedules.length === 0) {
                requestShedules();
            };
        };
    
    }, [user, socketClient]); // El arreglo vacío [] asegura que esto solo se ejecute al montar/desmontar el componente

    return { schedules, editSchedule, dltSchedule };
};
