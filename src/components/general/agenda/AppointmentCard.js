import { useDates } from "@/hooks/useCalendar";

export default ({ appointment, employeeIndex, totalEmployees }) => {
    const { timeToMinutes } = useDates();
    const startMinutes = timeToMinutes(appointment.quote.start_time);
    const endMinutes = timeToMinutes(appointment.quote.end_time);
    const slotHeight = (endMinutes - startMinutes) * 2;
    const position = (startMinutes * 2) - 90;
    const slotWidth = `calc(${100 / totalEmployees}% - 5px)`;

    return (
        <div
            className="bg-infinity-black-carbon/80 absolute text-[10px] md:text-sm p-2 rounded-lg"
            style={{
                top: `${position}px`,
                height: `${slotHeight}px`,
                left: `calc(${employeeIndex * 100 / totalEmployees}% + ${employeeIndex * 5}px)`,
                width: slotWidth,
            }}
        >
            
            <p className=" text-infinity-pink-lightPink w-full text-center absolute top-[40%]">No disponible</p>
            
        </div>
    );
};
