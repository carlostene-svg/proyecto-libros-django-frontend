import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Button, Box } from "@mui/material";
import { fetchAuthors } from "../services/AuthorService";
import Spinner from "../components/Spinner";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export default function AuthorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors().then((data) => {
      const found = data.find((a) => a.id === parseInt(id));
      setAuthor(found);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false); 
    });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }
  if (!author) {
    return <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>Autor no encontrado</Typography>;
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3 }}>
        {author.imagen && (
          <CardMedia
            component="img"
            height="400"
            image={
              author.imagen.startsWith("data:") || author.imagen.startsWith("http")
                ? author.imagen
                : `${MEDIA_URL}/${author.imagen}`
            }
            alt={author.nombre}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary">
            {author.nombre}
          </Typography>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
            Fecha de Nacimiento:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {author.fecha_nacimiento || "No especificada"}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
            Biografía:
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            {author.biografia || "Este autor aún no tiene una biografía registrada."}
          </Typography>
        </CardContent>
        
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" onClick={() => navigate("/")}>
                Volver a la lista
            </Button>
        </Box>
      </Card>
    </Box>
  );
}