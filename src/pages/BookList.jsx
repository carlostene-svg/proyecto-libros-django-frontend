import { useEffect, useState } from 'react';
import { Grid, Stack, Button, Typography } from '@mui/material';
import BookCard from '../components/BookCard'; 
import { fetchBooks, deleteBook } from '../services/BookService';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import Spinner from '../components/Spinner';

export default function BookList() {
  const isLoggedIn = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        alert("Error obteniendo los libros");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este libro?")) return;
    try {
      await deleteBook(id);
      setBooks(books.filter((b) => b.id !== id));
      alert("Libro eliminado exitosamente");
    } catch (error) {
      alert("Error eliminando el libro");
      console.error("Detalle del error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
        Catálogo de Libros
      </Typography>

      {isLoggedIn && (
        <Stack direction="row" justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => navigate("/add-book")}
          >
            Agregar Libro
          </Button>
        </Stack>
      )}

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid key={book.id} item xs={12} sm={6} md={4}>
            <BookCard book={book} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}