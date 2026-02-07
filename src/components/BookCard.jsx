import { Button, Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function BookCard({ book, onDelete }) {
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    
    const imagePath = book.portada && book.portada.startsWith("data:") 
        ? book.portada 
        : `${mediaUrl}/${book.portada}`;

    const isLoggedIn = localStorage.getItem("access_token") !== null;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}>
            <CardMedia
                component="img"
                height={250}
                image={imagePath}
                alt={book.titulo}
                sx={{ borderRadius: "4px", objectFit: 'contain', bgcolor: '#f5f5f5' }}
            />
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {book.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Autor ID: {book.autor}
                </Typography>
            </CardContent>

            <Stack spacing={1} sx={{ p: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/book/${book.id}`}
                    sx={{ borderRadius: "6px" }}
                >
                    Ver Detalles
                </Button>

                {isLoggedIn && (
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                            variant="contained"
                            color="info"
                            size="small"
                            startIcon={<Edit />}
                            component={Link}
                            to={`/edit-book/${book.id}`}
                            sx={{
                                minWidth: "40px",
                                height: "40px",
                                borderRadius: "6px",
                                padding: 0,
                                "& .MuiButton-startIcon": { margin: 0 }
                            }}
                        />
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => onDelete(book.id)}
                            sx={{
                                minWidth: "40px",
                                height: "40px",
                                borderRadius: "6px",
                                padding: 0,
                                "& .MuiButton-startIcon": { margin: 0 }
                            }}
                        />
                    </Stack>
                )}
            </Stack>
        </Card>
    );
}