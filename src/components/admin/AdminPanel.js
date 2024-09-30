import { useState } from "react";
import MenuPanelAdmin from "./MenuPanelAdmin";
import { useUser } from "@/config/UserContext";
import { menuItemsList } from "@/lib/menuItems";
import TimePlanner from "@/components/general/agenda/TimePlanner";
import SchedulePanelAdmin from "./SchedulePanelAdmin";
import ServicePanelAdmin from "./ServicePanelAdmin";
import TeamPanelAdmin from "./TeamPanelAdmin";

// Documentación del componente
/**
 * AdminPanel es el componente principal que renderiza los paneles de administración
 * de acuerdo al ítem de menú seleccionado. Contiene un menú de navegación y paneles
 * de contenido.
 */

const AdminPanel = () => {
    const { user } = useUser();
    const [menuItems, setMenuItems] = useState(menuItemsList);

    // Función para renderizar el panel correspondiente al ítem seleccionado
    const renderPanel = () => {
        const selectedMenu = menuItems.find(item => item.selected);

        switch (selectedMenu?.id) {
            case "agenda":
                return <TimePlanner />;
            case "horario":
                return <SchedulePanelAdmin />;
            case "servicios":
                return user?.rol === "admin" ? <ServicePanelAdmin /> : null;
            case "equipo":
                return user?.rol === "admin" ? <TeamPanelAdmin /> : null;
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full grow flex flex-row items-start">
            {/* Menú de navegación */}
            <div className="nav-items -translate-x-[100%] lg:translate-x-0 w-full fixed lg:static lg:w-[20%] h-screen lg:h-full bg-infinity-black-carbon drop-shadow-lg shadow-lg z-10">
                <MenuPanelAdmin
                    menuItems={menuItems}
                    setMenuItems={setMenuItems}
                />
            </div>

            {/* Contenido del panel */}
            <div className="w-full h-full overflow-auto grow">
                {renderPanel()}
            </div>
        </div>
    );
};

export default AdminPanel;
