import { useUser } from "@/config/UserContext";
import { useState, useEffect, useCallback } from "react";
import { getServices, postService, deleteService, putService } from "@/config/service";
import { useSocket } from "@/config/socketContext";

export const useServices = (initialServices) => {
    const { user } = useUser();
    const socketClient = useSocket();
    const [services, setServices] = useState(initialServices || []);

    // Función para manejar la obtención de horarios
    const requestServices = useCallback(async () => {
        await getServices();
    }, []);

    // Manejo de edición de horarios
    const editService = useCallback(async (idService, data) => {
        const result = await putService(idService, data);
        return result;
    }, []);

    // Manejo de eliminación de horarios
    const dltService = useCallback(async (idService) => {
        const result = await deleteService(idService);
        return result;
    }, []);

    // Manejo de creación de horarios
    const addService = useCallback(async (data) => {
        const result = await postService(data);
        return result;
    }, []);

    useEffect(() => {
        if (user) {
            socketClient.on("getServicesList", (services) => {
                setServices(services || []);
            });

            if (services.length === 0) {
                requestServices();
            };

            return ()=> {
                socketClient.off("getServicesList");
            };
        };

    }, [user, socketClient]); // El arreglo vacío [] asegura que esto solo se ejecute al montar/desmontar el componente

    return { services, editService, dltService, addService };
};
