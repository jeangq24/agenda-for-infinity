import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
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

export const useDates = () => {
    const currentDate = today(getLocalTimeZone());
    const twoMonthsLater = currentDate.add({ months: 2 });

    const rangeDate = (day, month, year) => {
        const dateNew = new CalendarDate(year, month, day);
        if (dateNew.compare(currentDate) < 0) {
            return null;
        };

        if (dateNew.compare(twoMonthsLater) > 0) {
            return null;
        };

        return true;

    };


    const validateTimeRange = (startTime, endTime) => {
        const startInMinutes = timeToMinutes(startTime);
        const endInMinutes = timeToMinutes(endTime);

        // Verificar que el horario de inicio sea menor que el de fin
        if (startInMinutes >= endInMinutes) {
            return false;
        }

        // Verificar que los tiempos estén en el rango de 01:00 a 24:00
        const minTime = timeToMinutes("01:00");
        const maxTime = timeToMinutes("24:00");

        if (startInMinutes < minTime || endInMinutes > maxTime) {
            return false;
        }

        return true;
    };

    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    return { currentDate, twoMonthsLater, rangeDate, validateTimeRange }
}