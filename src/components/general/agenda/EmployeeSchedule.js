import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { useDates } from "@/hooks/useCalendar";
import { User } from "@phosphor-icons/react";
import { Tooltip } from "@nextui-org/react";
export default ({ employee, employeeIndex, totalEmployees, onOpenChange, formData, setFormData }) => {
    const { timeToMinutes, minutesToTime } = useDates();
    const employeeSchedule = employee?.schedules;
    const employeeAppointments = employee?.appointments;
    const startMinutesSchedule = timeToMinutes(employeeSchedule?.start_time);
    const endMinutesSchedule = timeToMinutes(employeeSchedule?.end_time);
    const slotHeightSchedule = (endMinutesSchedule - startMinutesSchedule) * 2;
    const positionSchedule = (startMinutesSchedule * 2) - 90;
    const slotWidthCardSchedules = `calc(${100 / totalEmployees}% - 5px)`;

    // Estado para controlar si está expandido o contraído
    const [isExpanded, setIsExpanded] = useState(false);

    // Función para alternar el estado de expansión
    const toggleExpand = (e) => {
        e.stopPropagation(); // Evitar la propagación del evento a los nodos padres
        setIsExpanded(prev => !prev);
    };

    const handleClick = (e) => {
        e.stopPropagation();

        const offsetY = e.nativeEvent.offsetY; // Obtener la posición Y del clic
        const clickedInterval = Math.floor(offsetY / 60); // Cada intervalo es de 60px de altura
        const clickedMinutes = startMinutesSchedule + (clickedInterval * 30); // Cada intervalo representa 30 minutos

        // Convertir los minutos a una hora cercana disponible
        const closestTime = minutesToTime(clickedMinutes);
        setFormData({...formData, startTime: closestTime, endTime: "", userId: employee.id, products: []})
        onOpenChange(true); // Abrir el modal o cualquier otra acción
    };

    return (
        <>
            <div
                onClick={handleClick}
                className="bg-infinity-pink-lightPink/60 absolute text-[10px] md:text-sm p-2 rounded-lg cursor-pointer"
                style={{
                    top: `${positionSchedule}px`,
                    height: `${slotHeightSchedule}px`,
                    left: `calc(${employeeIndex * 100 / totalEmployees}% + ${employeeIndex * 5}px)`,
                    width: slotWidthCardSchedules,
                }}
            >
                <div
                    onClick={toggleExpand}
                    className={`z-10 sticky top-0 text-infinity-white-snow bg-infinity-pink-salmonPink/80 hover:bg-infinity-pink-salmonPink rounded-lg transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center py-2 ${isExpanded ? "w-44 px-4" : "w-10 px-0"
                        }`}
                >
                    <Tooltip content="Estilista" id>
                        {isExpanded ? employee.person.name : (
                            <User className="font-bold" /> // Icono o indicador para expandir
                        )}

                    </Tooltip>
                </div>
            </div>

            {employeeAppointments?.map(appointment => (
                <AppointmentCard
                    key={appointment.quote.id}
                    appointment={appointment}
                    employeeIndex={employeeIndex}
                    totalEmployees={totalEmployees}
                />
            ))}
        </>
    );
};
