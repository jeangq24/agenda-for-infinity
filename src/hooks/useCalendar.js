import { today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

// Hook principal
export const useCalendar = () => {
    const currentDate = today(getLocalTimeZone());
    const twoMonthsLater = currentDate.add({ months: 2 });
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [agenda, setAgenda] = useState([]);
    const [employees, setEmployees] = useState([]);

    // Función para manejar la selección de una fecha en el calendario
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // Aquí podrías hacer una llamada a la API para obtener la agenda y empleados para el día seleccionado
        const exampleAgenda = getAgendaForDate(date);
        const exampleEmployees = getEmployeesForDate(date); // Obtener empleados para ese día
        setAgenda(exampleAgenda);
        setEmployees(exampleEmployees);
    };

    // Simulación de obtener horarios y citas
    const getAgendaForDate = (date) => {
        // Simulación de citas. Reemplaza esto con una llamada a la API o base de datos.
        const appointments = [
            { employeeId: 1, time: '09:00', service: 'Corte de cabello' },
            { employeeId: 2, time: '10:30', service: 'Manicure' },
            { employeeId: 1, time: '14:00', service: 'Peinado' }
        ];
        return appointments;
    };

    // Simulación de obtener empleados y sus horarios para una fecha específica
    const getEmployeesForDate = (date) => {
        // Simulación de empleados y horarios. Reemplaza esto con una llamada a la API o base de datos.
        const employees = [
            { id: 1, name: 'Estilista 1', startTime: '08:00', endTime: '16:00' },
            { id: 2, name: 'Estilista 2', startTime: '09:00', endTime: '18:00' }
        ];
        return employees;
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
        agenda,
        employees
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

    const minutesToTime = (minutes) => {
        // Redondear los minutos al múltiplo más cercano de 30
        const roundedMinutes = Math.round(minutes / 30) * 30;

        const hours = Math.floor(roundedMinutes / 60); // Convertir minutos a horas
        const remainingMinutes = roundedMinutes % 60;  // Obtener los minutos restantes (puede ser 00 o 30)

        // Formatear las horas y minutos para que siempre tengan 2 dígitos
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(remainingMinutes).padStart(2, "0");

        // Devolver el tiempo en formato "HH:mm"
        return `${formattedHours}:${formattedMinutes}`;
    };

    function calculateEndTime(startTime, minutesToAdd) {
        // Convertir la hora inicial en un objeto Date
        const [hours, minutes] = startTime.split(':').map(Number);
        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        // Sumar los minutos a la hora inicial
        date.setMinutes(date.getMinutes() + minutesToAdd);

        // Obtener la hora y minutos finales con formato de dos dígitos
        const finalHours = String(date.getHours()).padStart(2, '0');
        const finalMinutes = String(date.getMinutes()).padStart(2, '0');

        // Retornar la hora final
        return `${finalHours}:${finalMinutes}`;
    };

    return { currentDate, twoMonthsLater, rangeDate, validateTimeRange, timeToMinutes, minutesToTime, calculateEndTime };
};