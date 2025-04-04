import { cookieFetchVerification } from "./cookieVerification";

export async function fetchAllUsers(page, filters ={}){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?${query.toString()}`, {
            cache: 'force-cache', 
            next: { tags: ['customers'], revalidate: 1800 },
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
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchUserInformation(id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/user_info`, {
            cache: 'force-cache', 
            next: { revalidate: 1800 },
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
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchUserOrders(id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/orders_history`,{
            cache: 'force-cache', 
            next: { revalidate: 1800 },
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
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchAllOrders(page, filters ={}){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?${query.toString()}`, {
            cache: 'force-cache', 
            next: { tags: ['orders'], revalidate: 1800 },
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
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchOrderById(id){    
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            cache: 'force-cache', 
            next: { revalidate: 1800 },
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
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

export async function fetchAllProducts(page, filters ={}) {
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${query.toString()}`, {
            cache: 'force-cache', 
            next: { tags: ['products'], revalidate: 1800 },
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

        const responseObject = await response.json();
        return { data: responseObject, expired: false };
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}

export async function fetchProductsById(id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
            cache: 'force-cache', 
            next: { revalidate: 1800 },
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
        return { data: responseObject, expired: false };

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

export async function fetchProductsByCategory(categoryId, page, filters ={}){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}?${query.toString()}`, {
            cache: 'force-cache', 
            next: { revalidate: 1800 },
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
        return { data: responseObject, expired: false }; 

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}


export async function fetchProductsBySearch(term, filters ={}){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    const query = new URLSearchParams({
        ...filters,
    });
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}&${query.toString()}`, {
            cache: 'force-cache', 
            next: { revalidate: 1800 },
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
        return { data: responseObject, expired: false };

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

/*dashboard information */
export async function fetchOrdersDashboardInfo(){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/dashboard`, {
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
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchProductsDashboardInfo(){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/dashboard`, {
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
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}


