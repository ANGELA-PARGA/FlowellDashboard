'use server'

import { cookieFetchVerification } from "@/lib/cookieVerification";
import { revalidatePath } from "next/cache";

export async function updateOrderShippingInfo(data, id){
    console.log('UPDATE ORDER SHIPPING INFO FETCH', data, id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/shipping_info`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data             
            }),
            headers : {
                "Content-Type": "application/json",
                /*cookie: cookieForServer*/
            }
        })

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            console.log(`UPDATING ORDER SHIPPING INFO FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json() 
        console.log('UPDATE ORDER SHIPPING INFORMATION RESULT:', responseObject)       
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING ORDER SHIPPING INFO', error);
        throw error         
    }
}

export async function updateOrderDeliverydateInfo(data, id){
    console.log('UPDATE ORDER DELIVERY DAY FETCH', data, id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/delivery_date`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data              
            }),
            headers : {
                "Content-Type": "application/json",
                /*cookie: cookieForServer*/
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`UPDATING ORDER DELIVERY DATE FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()   
        console.log('UPDATE ORDER DELIVERY DATE RESPONSE:', responseObject)     
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING DELIVERY DATE INFO', error);
        throw error         
    }
}

export async function updateOrderedItems(data, id){
    console.log('UPDATE ORDERED ITEMS FETCH', data, id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/items_ordered`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data               
            }),
            headers : {
                "Content-Type": "application/json",
                /*cookie: cookieForServer*/
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`UPDATING ORDERED ITEMS FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()   
        console.log('UPDATE ORDERED ITEMS RESPONSE:', responseObject)     
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING ORDERED ITEMS INFO', error);
        throw error         
    }
}

export async function shipOrder(data, id){
    console.log('SHIP ORDER FETCH', data, id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/ship_order`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data               
            }),
            headers : {
                "Content-Type": "application/json",
                /*cookie: cookieForServer*/
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`SHIP ORDER FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()   
        console.log('SHIP ORDER RESPONSE:', responseObject)     
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR SHIPPING ORDER INFO', error);
        throw error         
    }
}

export async function cancelOrder(id){
    console.log('CANCEL ORDER FETCH', id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/
    try {
        console.log('cancel order fetch:', id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            method: 'PATCH',
            /*headers : {
                cookie: cookieForServer
            }*/
        })

        if (!response.ok) {   
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            console.log(`CANCEL ORDER FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}`);
        } 

        const responseObject = await response.json()
        console.log('CANCEL ORDER RESPONSE:', responseObject)
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject;        
    } catch (error) {
        console.error('NETWORK ERROR CANCELING ORDER:', error);
        throw error;        
    }
}