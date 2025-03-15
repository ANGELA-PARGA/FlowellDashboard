'use server'

import { cookieFetchVerification } from "@/lib/cookieVerification";
import { revalidatePath } from "next/cache";

export async function updateProductDetails(data, id){
    console.log('UPDATE PRODUCT DETAILS FETCH', data, id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/product_details`, {
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
            console.log(`UPDATING PRODUCT DETAILS FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json() 
        console.log('UPDATE PRODUCT DETAILS RESULT:', responseObject)       
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING PRODUCT DETAILS', error);
        throw error         
    }
}

export async function updateStock(data, id){
    console.log('UPDATE PRODUCT STOCK FETCH', data, id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/stock`, {
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
            console.log(`UPDATING PRODUCT STOCK FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()   
        console.log('UPDATE PRODUCT STOCK RESPONSE:', responseObject)     
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING PRODUCT STOCK', error);
        throw error         
    }
}

export async function createNewProduct(data){
    console.log('CREATE PRODUCT FETCH', data)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`, {
            method: 'POST',
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
            console.log(`CREATE PRODUCT FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json() 
        console.log('CREATE PRODUCT RESULT:', responseObject)       
        revalidatePath(`/admin_panel/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR CREATING PRODUCT', error);
        throw error         
    }
}


