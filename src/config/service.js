import {SERVICE} from "@/config/index";
import toast from "react-hot-toast";

export const getServices = async() => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
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
        console.log("getServices: ", error);
        return false;
    };
};

export const putService = async(id, data) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
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
        console.log("putService: ", error);
        return false;
    };
};

export const deleteService = async(id) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
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
        console.log("deleteService: ", error);
        return false;
    };
};

export const postService = async(data) => {
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${SERVICE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
            credentials: "include"
        });
        
        const result = await response.json();
    
        if(result?.error) {
            toast.error(result.error);
            return null;
        };

        return result;
    } catch (error) {
        console.log("postService: ", error);
        return false;
    };
};

