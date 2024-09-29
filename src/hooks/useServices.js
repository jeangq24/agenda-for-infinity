import { useUser } from "@/config/UserContext";
import { useState, useEffect } from "react";
import { getServices, postService, deleteService, putService } from"@/config/service";
import { useSocket } from "@/config/socketContext";

export const useServices = () => {
    const { user } = useUser();
    const socketClient = useSocket();
    const [services, setServices] = useState([]);
    
    const requestServices = async () => { 
        await getServices();  
    };

    const editService = async(idService, data) => {
        const result = await putService(idService, data);
        return result;
    }

    const dltService = async(idService) => {
        const result = await deleteService(idService);
        return result;
    };

    const addService = async (data) => {
        const result = await postService(data)
        return result;
    };

    useEffect(() => {
        if(user) {
            socketClient.on("getServicesList", (services)=> {
                setServices(services || []);
            });

            if(services.length === 0) {
                requestServices();
            };
        };
    
    }, [user, socketClient]); // El arreglo vacío [] asegura que esto solo se ejecute al montar/desmontar el componente

    return { services, editService, dltService, addService };
};
