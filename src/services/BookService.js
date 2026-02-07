import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*Convertir un archivo a Base64 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/*Obtener la lista de libros*/
export async function fetchBooks() {
    const response = await axios.get(`${API_BASE_URL}/libros/`);
    return response.data;
}

/*Crear un nuevo libro*/
export async function addBook(bookData) {
    let portadaBase64 = '';
    if (bookData.portada) {
        portadaBase64 = await fileToBase64(bookData.portada);
    }
    const payload = {
        ...bookData,
        portada: portadaBase64
    };
    const response = await axios.post(`${API_BASE_URL}/libros/`, payload);
    return response.data;
}

/*Editar Libro*/
export async function editBook(bookId, bookData) {
    let payload = {
        titulo: bookData.titulo,
        resumen: bookData.resumen,
        fecha_publicacion: bookData.fecha_publicacion,
        autor: bookData.autor, 
    };

    if (bookData.portada instanceof File) {
        const portadaBase64 = await fileToBase64(bookData.portada);
        payload.portada = portadaBase64;
    }

    const response = await axios.put(`${API_BASE_URL}/libros/${bookId}/`, payload);
    return response.data;
}

/*Eliminar Libro*/
export async function deleteBook(bookId) {
    const response = await axios.delete(`${API_BASE_URL}/libros/${bookId}/`);
    return response.data;
}