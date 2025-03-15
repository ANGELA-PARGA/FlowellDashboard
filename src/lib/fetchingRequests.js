import { cookieFetchVerification } from "./cookieVerification";

export async function fetchAllUsers(page, filters ={}){
    console.log('CALLING SERVER FETCH ALL USERS', page, filters)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?${query.toString()}`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`getting all users failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('SERVER RESPONSE FETCH ALL USERS:', responseObject)
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchUserInformation(id){
    console.log('CALLING SERVER FETCH USER INFORMATION', id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/user_info`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`getting user information failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('SERVER RESPONSE FETCH USER INFORMATION:', responseObject)
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchUserOrders(id){
    console.log('CALLING SERVER FETCH USER ORDERS HISTORY')
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/orders_history`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`getting users order history failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('SERVER RESPONSE FETCH USER ORDERS HISTORY:', responseObject)
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchAllOrders(page, filters ={}){
    console.log('CALLING SERVER FETCH ALL ORDERS', page, filters)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?${query.toString()}`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`getting all orders info failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('SERVER RESPONSE FETCH ALL ORDERS:', responseObject)
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchOrderById(id){
    console.log('CALLING SERVER FETCH ORDER INFO BY ID:', id)
    
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, /*{
            headers : {cookie: cookieForServer}
        } , { cache: 'force-cache', next: { revalidate: 1800 }}*/)
        if (!response.ok) {       
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            } 
            const errorResponse = await response.json();
            console.log(`fetching order by id failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('SERVER RESPONSE FETCH ORDER INFO:', responseObject)
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

export async function fetchAllProducts(page, filters ={}) {
    console.log('calling fetch all products:', page, filters)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${query.toString()}`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/);

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }

            const errorResponse = await response.json();
            console.log(`fetching all products failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        }

        const responseObject = await response.json();
        console.log(`fetching  all products RESPONSE:`, responseObject);
        return { data: responseObject, expired: false };
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}

export async function fetchProductsById(id){
    console.log('calling fetch product by id:', id)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }

            const errorResponse = await response.json();
            console.log(`fetching products by id`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log(`fetching products by id RESPONSE:`, responseObject);
        return { data: responseObject, expired: false };

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

export async function fetchProductsByCategory(categoryId, page, filters ={}){
    console.log('calling fetch all products by category:', categoryId, page, filters)
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}?${query.toString()}`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }

            const errorResponse = await response.json();
            console.log(`fetching products by category id`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('all products by category RESPONSE:', responseObject)
        return { data: responseObject, expired: false }; 

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}


export async function fetchProductsBySearch(term, filters ={}){
    console.log(`calling fetch products by search`, term, filters);
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    const query = new URLSearchParams({
        ...filters,
    });
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}&${query.toString()}`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }       
            const errorResponse = await response.json();
            console.log(`search product by term failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log(`fetch products by search response:`, responseObject);
        return { data: responseObject, expired: false };

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

/*dashboard information */
export async function fetchOrdersDashboardInfo(){
    console.log('CALLING SERVER FETCH ORDERS DASHBOARD INFO')
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/dashboard`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`getting orders dashboard info failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('SERVER RESPONSE FETCH ORDERS DASHBOARD INFO:', responseObject)
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}

export async function fetchProductsDashboardInfo(){
    console.log('CALLING SERVER FETCH PRODUCTS DASHBOARD INFO')
    /*const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }*/

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/dashboard`, /*{
            headers : {cookie: cookieForServer}
        }, { cache: 'force-cache', next: { revalidate: 1800 }}*/)

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`getting products dashboard info failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('SERVER RESPONSE FETCH PRODUCTS DASHBOARD INFO:', responseObject)
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}


