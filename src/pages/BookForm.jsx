import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, editBook, fetchBooks } from "../services/BookService";
import { fetchAuthors } from "../services/AuthorService";
import Spinner from "../components/Spinner";

export default function BookForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    
    const [bookData, setBookData] = useState({
        titulo: '',
        resumen: '',
        fecha_publicacion: '',
        autor: '',
        portada: null
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const authorsList = await fetchAuthors();
                setAuthors(authorsList);

                if (id) {
                    const booksList = await fetchBooks();
                    const found = booksList.find((b) => b.id === parseInt(id));
                    if (found) {
                        setBookData({
                            titulo: found.titulo,
                            resumen: found.resumen,
                            fecha_publicacion: found.fecha_publicacion,
                            autor: found.autor,
                            portada: found.portada
                        });
                    }
                }
            } catch (err) {
                console.error("Error al cargar datos:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "portada") {
            setBookData({ ...bookData, portada: files[0] });
        } else {
            setBookData({ ...bookData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await editBook(id, bookData);
                alert("Libro actualizado");
            } else {
                await addBook(bookData);
                alert("Libro creado con éxito");
            }
            navigate("/libros");
        } catch (err) {
            console.error(err);
            alert("Error al procesar el libro");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                {id ? "Editar Libro" : "Nuevo Libro"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField label="Título" name="titulo" value={bookData.titulo} onChange={handleChange} required fullWidth />
                
                <TextField
                    select
                    label="Seleccionar Autor"
                    name="autor"
                    value={bookData.autor}
                    onChange={handleChange}
                    required
                >
                    {authors.map((a) => (
                        <MenuItem key={a.id} value={a.id}>
                            {a.nombre}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField label="Resumen" name="resumen" multiline rows={4} value={bookData.resumen} onChange={handleChange} fullWidth />
                
                <TextField
                    label="Fecha de Publicación"
                    name="fecha_publicacion"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={bookData.fecha_publicacion}
                    onChange={handleChange}
                    fullWidth
                />

                <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>Portada:</Typography>
                    <input type="file" name="portada" accept="image/*" onChange={handleChange} />
                </Box>

                <Button variant="contained" type="submit" size="large" color="primary">
                    {id ? "Guardar Cambios" : "Crear Libro"}
                </Button>
                <Button variant="text" onClick={() => navigate("/libros")}>Cancelar</Button>
            </Box>
        </Box>
    );
}