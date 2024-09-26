import { today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";


export const useCalendar = () => {
    const currentDate = today(getLocalTimeZone());
    const twoMonthsLater = currentDate.add({ months: 2 });
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [agenda, setAgenda] = useState(['09:00', '10:30', '14:00']);



    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // Aquí podrías hacer una llamada a la API para obtener la agenda para el día seleccionado
        const exampleAgenda = getAgendaForDate(date); // función ficticia para obtener la agenda
        setAgenda(exampleAgenda);
    };

    const getAgendaForDate = (date) => {
        // Simulación de datos, deberías reemplazarlo con una llamada a la API o a la base de datos
        const unavailableSlots = ['09:00', '10:30', '14:00'];
        return unavailableSlots;
    };


    const isDateUnavailable = (date) => {
        return (
            date.compare(currentDate) < 0 || // Fecha anterior a la fecha actual
            date.compare(twoMonthsLater) > 0 // Fecha posterior a dos meses después
        );
    };

    return {
        isDateUnavailable,
        selectedDate,
        currentDate,
        twoMonthsLater,
        handleDateSelect,
        agenda
    };
};