import { useUser } from "@/config/UserContext";
import { useDates } from "@/hooks/useCalendar";
import { Tooltip } from "@nextui-org/react";
import { Gear, Eye } from "@phosphor-icons/react"
export default ({ appointment, employeeIndex, totalEmployees }) => {
    const { timeToMinutes } = useDates();
    const { user } = useUser();
    const startMinutes = timeToMinutes(appointment.quote.start_time);
    const endMinutes = timeToMinutes(appointment.quote.end_time);
    const slotHeight = (endMinutes - startMinutes) * 2;
    const position = (startMinutes * 2) - 90;
    const slotWidth = `calc(${100 / totalEmployees}% - 5px)`;

    const handleDragStart = (e) => {
        e.dataTransfer.setData("appointmentId", appointment.quote.id);
    };

    const classNamaHeadIconButton = `w-5 h-5 text-infinity-white-snow cursor-pointer rounded-full hover:bg-infinity-pink-salmonPink font-bold transition duration-500 p-[2px]`;

    return (
        <div
            className={`bg-infinity-black-carbon/80 absolute text-[10px] md:text-sm p-2 rounded-lg ${(user?.id === appointment?.quote?.userId) && "cursor-grab"}`}
            style={{
                top: `${position}px`,
                height: `${slotHeight}px`,
                left: `calc(${employeeIndex * 100 / totalEmployees}% + ${employeeIndex * 5}px)`,
                width: slotWidth,
            }}
            draggable={(user?.id === appointment?.quote?.userId) ? true : false} // Hacer la cita arrastrable
            onDragStart={(user?.id === appointment?.quote?.userId) ? handleDragStart : null} // Evento de arrastre // Evento de arrastre
        >
            {
                (user?.id === appointment?.quote?.userId) ?
                    <div className="w-full h-full flex justify-center items-center relative">
                        <div className="flex flex-row gap-2 absolute top-0 right-1">

                        <Tooltip content="Editar cita">
                            <Gear
                                className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`}
                            />

                        </Tooltip>

                        <Tooltip content="Ver cita">
                            <Eye
                                className={`${classNamaHeadIconButton} bg-infinity-pink-softPink`}
                            />

                        </Tooltip>

                        </div>
                        <p className=" text-infinity-pink-lightPink w-full text-center">Hora ocupada</p>
                    </div>
                    :
                    <div className="w-full h-full flex justify-center items-center">
                        <p className=" text-infinity-pink-lightPink w-full text-center">Hora ocupada</p>

                    </div>
            }

        </div>
    );
};
