import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Button, Box, Divider } from "@mui/material";
import { fetchBooks } from "../services/BookService";
import Spinner from "../components/Spinner";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks().then((data) => {
      const found = data.find((b) => b.id === parseInt(id));
      setBook(found);
    })
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  if (!book) {
    return <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>Libro no encontrado</Typography>;
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 800, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: { md: 300 }, height: { xs: 400, md: 'auto' }, objectFit: 'cover', bgcolor: '#f0f0f0' }}
          image={
            book.portada?.startsWith("data:") || book.portada?.startsWith("http")
              ? book.portada
              : `${MEDIA_URL}/${book.portada}`
          }
          alt={book.titulo}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              {book.titulo}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Resumen:</Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              {book.resumen || "No hay un resumen disponible para este libro."}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Fecha de Publicación:</Typography>
            <Typography variant="body1" gutterBottom>
              {book.fecha_publicacion || "Desconocida"}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>ID del Autor:</Typography>
            <Typography variant="body1">{book.autor}</Typography>
          </CardContent>
          
          <Box sx={{ p: 2, mt: 'auto' }}>
            <Button variant="outlined" fullWidth onClick={() => navigate("/libros")}>
              Volver al Catálogo
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}