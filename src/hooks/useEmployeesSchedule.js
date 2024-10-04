import { useUser } from "@/config/UserContext";
import { useState, useEffect, useCallback } from "react";
import { getEmployeesAgenda } from "@/config/agenda";
import { useSocket } from "@/config/socketContext";
import { useServices } from "@/hooks/useServices";
import { postQuote } from "@/config/quote";

export const useEmployeesAgenda = (initialEmployeesAgenda, date, filter) => {
    const [employeesAgendaFull, setEmployeesAgendaFull] = useState(initialEmployeesAgenda || [])
    const [employeesAgenda, setEmployeesAgenda] = useState(initialEmployeesAgenda || []);
    const [employeesNames, setEmployeesNames] = useState(["Todos"])
    const [loading, setLonding] = useState();
    const { user } = useUser();
    const socketClient = useSocket();
    const { services } = useServices();

    const requestEmployeeAgenda = useCallback(async () => {
        setLonding(true)
        await getEmployeesAgenda();
        setLonding(false)
    }, []);

    const generateEmployeeDailyData = useCallback(async (employeesWithSchedulesAndQoutes) => {

        const getScheduleForDate = (schedules) => {
            // Buscar el horario específico de la fecha
            let schedule = schedules.find((schedule) => (
                schedule.day === date.day && 
                schedule.month === date.month && 
                schedule.year === date.year && 
                schedule.default === false
            ));
    
            // Si no hay horario específico, buscar el horario por defecto
            if (!schedule) {
                schedule = schedules.find((schedule) => schedule.default === true);
            }
    
            return schedule;
        };
    
        const getAppointmentsForDate = (appointments) => {
       
            return appointments.filter((appointment) => (
                appointment.quote.day === date.day && 
                appointment.quote.month === date.month && 
                appointment.quote.year === date.year
            ));
        };
    
        const employeesAgendaDay = (filter === "Todos")
            ? employeesWithSchedulesAndQoutes.map((employee) => {
                const schedule = getScheduleForDate(employee.schedules);
                const appointments = getAppointmentsForDate(employee.appointments);
                return { ...employee, schedules: schedule, appointments };
            })
            : employeesWithSchedulesAndQoutes
                .filter((employee) => employee.person.name === filter)
                .map((employee) => {
                    const schedule = getScheduleForDate(employee.schedules);
                    const appointments = getAppointmentsForDate(employee.appointments);
                    return { ...employee, schedules: schedule, appointments };
                });
    
        setEmployeesAgenda(employeesAgendaDay || []);
    }, [date, filter]);
    

    const selectFilter = useCallback(async () => {
        generateEmployeeDailyData(employeesAgendaFull);
    }, [filter]);

    const addQuote = useCallback(async (data) => {
        const result = await postQuote(data);
        return result;
      }, [])

    useEffect(() => {
        if (employeesAgendaFull) {
            setEmployeesNames(["Todos", ...employeesAgendaFull.map((employee) => {
                return employee?.person?.name;
            })])

        }
    }, [employeesAgendaFull])

    useEffect(() => {
        if (socketClient) {
            // Evento de socket para actualizar la lista de empleados
            socketClient?.on("AgendaData", (employeesAgenda) => {

                setLonding(true);
                setEmployeesAgendaFull(employeesAgenda)
                generateEmployeeDailyData(employeesAgenda);
                setLonding(false)
            });

            // Petición inicial de empleados si la lista está vacía
            if (employeesAgenda.length === 0) {
                requestEmployeeAgenda();
            }else {
                generateEmployeeDailyData(employeesAgendaFull);
            }

        }

        // Limpieza del evento cuando se desmonta el componente
        return () => {
            socketClient?.off("AgendaData");
        };

    }, [date, socketClient]);

    return {
        employeesAgenda,
        employeesNames,
        selectFilter,
        loading,
        services,
        addQuote
    };
};