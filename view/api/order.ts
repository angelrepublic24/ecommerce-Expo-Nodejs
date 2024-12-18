import { useAuth } from "@/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function createOrders(items: any[]){
    const token = useAuth.getState().token;

    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({order: {}, items})
    })

    const data = res.json()
    if(!res.ok){
        throw new Error (`Error creating order`);
    }
    return data;
}
