import { CalendarDots, Clock, Package, UsersFour, XCircle } from "@phosphor-icons/react";
import TimePlanner from "@/components/general/agenda/TimePlanner";
import { useState } from "react";
import MenuPanelAdmin from "./MenuPanelAdmin";
import SchedulePanelAdmin from "./SchedulePanelAdmin";
import ServicePanelAdmin from "./ServicePanelAdmin";
import { useUser } from "@/config/UserContext";
import TeamPanelAdmin from "./TeamPanelAdmin";
export default () => {
    const {user} = useUser();
    const [menuItems, setMenuItems] = useState(
        [
            { id: "agenda", content: "Agenda", selected: false, Icon: <CalendarDots className="w-8 h-8" /> },
            { id: "horario", content: "Horario", selected: false, Icon: <Clock className="w-8 h-8" /> },
            { id: "servicios", content: "Servicios", selected: false, Icon: <Package className="w-8 h-8" /> },
            { id: "equipo", content: "Equipo de trabajo", selected: true, Icon: <UsersFour className="w-8 h-8" /> },
            { id: "cerrarSesion", content: "Cerrar Sesion", selected: false, Icon: <XCircle className="w-8 h-8" /> }
        ]
    )
    return (
        <div className="w-full h-full grow flex flex-row items-start">
            <div className="nav-items -translate-x-[100%] lg:translate-x-0 w-full fixed lg:static lg:w-[20%] h-screen lg:h-full bg-infinity-black-carbon drop-shadow-lg shadow-lg z-10">
                <MenuPanelAdmin
                    menuItems={menuItems}
                    setMenuItems={setMenuItems}
                />
            </div>
            <div className="w-full h-full overflow-auto grow">
                {(menuItems[0].selected) && <TimePlanner />}
                {(menuItems[1].selected) && <SchedulePanelAdmin />}
                {(menuItems[2].selected && user?.rol === "admin") && <ServicePanelAdmin />}
                {(menuItems[3].selected && user?.rol === "admin") && <TeamPanelAdmin />}
            </div>
        </div>

    )
};


