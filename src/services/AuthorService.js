import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interceptor para pegar el token automáticamente 
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* Convertir un archivo a Base64*/
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/*Obtener la lista de autores*/
export async function fetchAuthors() {
    const response = await axios.get(`${API_BASE_URL}/autores/`);
    return response.data;
}

/*Crear un nuevo autor (con imagen en Base64)*/
export async function addAuthor(authorData) {
    let fotoBase64 = '';
    if (authorData.foto) {
        fotoBase64 = await fileToBase64(authorData.foto);
    }
    const payload = {
        ...authorData,
        foto: fotoBase64
    };
    const response = await axios.post(`${API_BASE_URL}/autores/`, payload);
    return response.data;
}

/*Editar Autor*/
export async function editAuthor(authorId, authorData) {
    let payload = {
        nombre: authorData.nombre,
        biografia: authorData.biografia,
        fecha_nacimiento: authorData.fecha_nacimiento,
    };

    if (authorData.foto instanceof File) {
        const fotoBase64 = await fileToBase64(authorData.foto);
        payload.foto = fotoBase64;
    }

    const response = await axios.put(`${API_BASE_URL}/autores/${authorId}/`, payload);
    return response.data;
}

/*Eliminar Autor*/
export async function deleteAuthor(authorId) {
    const response = await axios.delete(`${API_BASE_URL}/autores/${authorId}/`);
    return response.data;
}