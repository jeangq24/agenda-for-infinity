import {SCHEDULE} from "@/config/index";
import toast from "react-hot-toast";

export const getSchedules = async() => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

            credentials: "include"
        });

        const result = await response.json();
        if(result?.error) {
            toast.error(result?.error);
            return null;
        };

        return result;
    } catch (error) {
        console.log("getSchedules: ", error);
        return false;
    };
};

export const putSchedule = async(id, data) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...data }),
            credentials: "include"
        });
        
        const result = await response.json();
        
        if(result?.error) {
            toast.error(result.error);
            return null;
        };

        return result;
    } catch (error) {
        console.log("postSchedule: ", error);
        return false;
    };
};

export const deleteShedule = async(id) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
            credentials: "include"
        });
        
        const result = await response.json();
        
        if(result?.error) {
            toast.error(result.error);
            return null;
        };

        return result;
    } catch (error) {
        console.log("postSchedule: ", error);
        return false;
    };
};

export const postSchedule = async(startTime, endTime, status, day, month, year) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SCHEDULE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startTime, endTime, status, day, month, year }),
            credentials: "include"
        });
        
        const result = await response.json();
    
        if(result?.error) {
            toast.error(result.error);
            return null;
        };

        return result;
    } catch (error) {
        console.log("postSchedule: ", error);
        return false;
    };
};

