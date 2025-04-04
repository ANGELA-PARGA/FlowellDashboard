'use server'

import { cookieFetchVerification } from "@/lib/cookieVerification";
import { revalidatePath } from "next/cache";

export async function updateOrderShippingInfo(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/shipping_info`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data             
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {
                console.error('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()       
        revalidatePath(`/admin_panel/orders/${id}`)
        revalidatePath(`/admin_panel/orders`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING ORDER SHIPPING INFO', error);
        throw error         
    }
}

export async function updateOrderDeliverydateInfo(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/delivery_date`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data              
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.error('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()      
        revalidatePath(`/admin_panel/orders/${id}`)
        revalidatePath(`/admin_panel/orders`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING DELIVERY DATE INFO', error);
        throw error         
    }
}

export async function updateOrderedItems(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/items_ordered`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data               
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.error('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()     
        revalidatePath(`/admin_panel/orders/${id}`)
        revalidatePath(`/admin_panel/orders`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING ORDERED ITEMS INFO', error);
        throw error         
    }
}

export async function shipOrder(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/ship_order`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data               
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.error('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()   
        revalidatePath(`/admin_panel/orders/${id}`)   
        revalidatePath(`/admin_panel/orders`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR SHIPPING ORDER INFO', error);
        throw error         
    }
}

export async function cancelOrder(id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            method: 'PATCH',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {   
            if (response.status === 401 || response.status === 403) {
                console.error('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/admin_panel/orders/${id}`)
        revalidatePath(`/admin_panel/orders`)
        return responseObject;        
    } catch (error) {
        console.error('NETWORK ERROR CANCELING ORDER:', error);
        throw error;        
    }
}