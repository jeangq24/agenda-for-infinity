import { useUser } from "@/config/UserContext";
import { useState, useEffect } from "react";
import { getSchedules } from"@/config/schedule";
import { useSocket } from "@/config/socketContext";

export const useSchedules = () => {
    const { user } = useUser();
    const socketClient = useSocket();
    const [schedules, setSchedules] = useState([]);
    
    const requestShedules = async () => { 
        const {schedules} = await getSchedules()    
    };

    useEffect(() => {
        if(user) {
            socketClient.on("getScheduleList", (schedules)=> {
                console.log(schedules)
                setSchedules(schedules || []);
            });

            if(schedules.length === 0) {
                requestShedules();
            };
        };
    
    }, [user, socketClient]); // El arreglo vacío [] asegura que esto solo se ejecute al montar/desmontar el componente

    return { schedules };
};
