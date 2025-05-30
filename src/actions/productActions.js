'use server'

import { cookieFetchVerification } from "@/lib/cookieVerification";
import { revalidatePath } from "next/cache";

export async function updateProductDetails(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/product_details`, {
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
        revalidatePath(`/admin_panel/products/${id}`)
        revalidatePath(`/admin_panel/products`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING PRODUCT DETAILS', error);
        throw error         
    }
}

export async function updateStock(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/stock`, {
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
        revalidatePath(`/admin_panel/products/${id}`)
        revalidatePath(`/admin_panel/products`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING PRODUCT STOCK', error);
        throw error         
    }
}

export async function createNewProduct(data){
    const formData = new FormData(); // ✅ Create FormData object to multipart forms

    // ✅ Append all text fields
    Object.keys(data).forEach(key => {
        if (key !== "images_url") {
            formData.append(key, data[key]);
        }
    });

    // ✅ Append images (if any)
    if (data.images_url) {
        data.images_url.forEach(file => {
            formData.append("images_url", file);
        });
    }
    
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`, {
            method: 'POST',
            body: formData,
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
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()        
        revalidatePath(`/admin_panel/products`)
        return responseObject;

    } catch (error) {
        console.error('NETWORK ERROR CREATING PRODUCT', error);
        throw error         
    }
}


