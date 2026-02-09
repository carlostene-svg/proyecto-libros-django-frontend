import { useEffect, useState } from 'react';
import { Grid, Stack, Button } from '@mui/material';
import AuthorCard from '../components/AuthorCard'; // Importamos tu AuthorCard
import { fetchAuthors, deleteAuthor } from '../services/AuthorService'; // Importamos tus servicios
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import Spinner from '../components/Spinner';

export default function AuthorList() {
  const isLoggedIn = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors()
      .then((data) => {
        setAuthors(data);
      })
      .catch((error) => {
        alert("Error obteniendo los autores");
        console.error("Error obteniendo los autores", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este autor?")) return;

    try {
      await deleteAuthor(id);
      setAuthors(authors.filter((a) => a.id !== id));
      alert("Autor eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando el autor:", error.response || error);
      alert("Error eliminando el autor");
    }
  };

  return (
    <>
      {isLoggedIn && (
        <Stack direction="row" justifyContent="center" sx={{ mb: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => navigate("/add-author")}
            sx={{ borderRadius: "8px" }}
          >
            Agregar Autor
          </Button>
        </Stack>
      )}

      <Grid container spacing={5} sx={{ mt: 2 }}>
        {authors.map((author) => (
          <Grid key={author.id} item xs={12} sm={4} md={3}>
            <AuthorCard author={author} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}