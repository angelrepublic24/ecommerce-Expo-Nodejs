const API_URL = process.env.EXPO_PUBLIC_API_URL
import { useForm } from "@/hooks/useForm";

export async function login(userToLogin){
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToLogin),
    });

    const data = await res.json();
    if (!res.ok){
        throw new Error(`Could not login`);
    }
    console.log(data)
    return data
}

export async function register(newUser){
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
    });

    const data = await res.json();
    if (!res.ok){
        console.log(data)
        throw new Error(`Could not login`);

    }
    return data
}