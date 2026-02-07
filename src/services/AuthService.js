import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_API_CLIENT_SECRET;

/* Iniciar sesión  */
export async function login(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    const response = await axios.post(`${AUTH_BASE_URL}/token/`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    
    localStorage.setItem("access_token", response.data.access_token);
    return response.data;
}

/*Cerrar sesión y revocar el token en el servidor*/
export async function logout() {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const params = new URLSearchParams();
    params.append("token", token);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);

    try {
        await axios.post(`${AUTH_BASE_URL}/revoke_token/`, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
    } catch (error) {
        console.error("Error al revocar token:", error);
    } finally {
        localStorage.removeItem("access_token");
    }
}