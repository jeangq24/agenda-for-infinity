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

export const putSchedule = () => {

};

export const deleteShedule = () => {

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
        
        console.log(result.error)
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

