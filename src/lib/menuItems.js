import { CalendarDots, Clock, Package, UsersFour, XCircle } from "@phosphor-icons/react";

// Definimos los ítems del menú en una constante
export const menuItemsList = [
    { id: "agenda", content: "Agenda", selected: false, Icon: <CalendarDots className="w-8 h-8" /> },
    { id: "horario", content: "Horario", selected: false, Icon: <Clock className="w-8 h-8" /> },
    { id: "servicios", content: "Servicios", selected: false, Icon: <Package className="w-8 h-8" /> },
    { id: "equipo", content: "Equipo de trabajo", selected: true, Icon: <UsersFour className="w-8 h-8" /> },
    { id: "cerrarSesion", content: "Cerrar Sesion", selected: false, Icon: <XCircle className="w-8 h-8" /> }
];

export const getMenuItems = () => [
    { id: "agenda", content: "Agenda", selected: false, Icon: <CalendarDots className="w-8 h-8" /> },
    { id: "horario", content: "Horario", selected: false, Icon: <Clock className="w-8 h-8" /> },
    { id: "servicios", content: "Servicios", selected: false, Icon: <Package className="w-8 h-8" /> },
    { id: "equipo", content: "Equipo de trabajo", selected: false, Icon: <UsersFour className="w-8 h-8" /> },
    { id: "cerrarSesion", content: "Cerrar Sesion", selected: false, Icon: <XCircle className="w-8 h-8" /> }
];
