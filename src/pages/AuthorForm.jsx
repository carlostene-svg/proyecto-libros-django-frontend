import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addAuthor, editAuthor, fetchAuthors } from "../services/AuthorService";
import Spinner from "../components/Spinner";

export default function AuthorForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [authorData, setAuthorData] = useState({
        nombre: '',
        biografia: '',
        fecha_nacimiento: '',
        imagen: null
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchAuthors().then((data) => {
                const found = data.find((a) => a.id === parseInt(id));
                if (found) {
                    setAuthorData({
                        nombre: found.nombre,
                        biografia: found.biografia,
                        fecha_nacimiento: found.fecha_nacimiento,
                        foto: found.foto, 
                    });
                }
            }).finally(() => setLoading(false));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "foto") {
            setAuthorData({ ...authorData, foto: files[0] });
        } else {
            setAuthorData({ ...authorData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await editAuthor(id, authorData);
                alert("Autor editado exitosamente");
            } else {
                await addAuthor(authorData);
                alert("Autor agregado exitosamente");
            }
            navigate("/");
        } catch (error) {
            console.error("Error al guardar el autor:", error);
            alert("Error al guardar el autor");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
                {id ? "Editar Autor" : "Agregar Nuevo Autor"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }} >
                <TextField
                    label="Nombre del Autor"
                    name="nombre"
                    variant="outlined"
                    onChange={handleChange}
                    value={authorData.nombre}
                    required
                />
                <TextField
                    label="Biografía"
                    name="biografia"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    value={authorData.biografia}
                />
                <TextField
                    label="Fecha de Nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    value={authorData.fecha_nacimiento}
                />

                <Typography variant="body1">Foto del Autor:</Typography>
                <input
                    name="foto"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />

                <Button variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
                    {id ? "Actualizar Autor" : "Guardar Autor"}
                </Button>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Cancelar
                </Button>
            </Box>
        </>
    );
}