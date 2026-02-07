import { Button, Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AuthorCard({ author, onDelete }) {
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    const imagePath = author.foto && author.foto.startsWith("data:")
        ? author.foto
        : `${mediaUrl}/${author.foto}`;

    const isLoggedIn = localStorage.getItem("access_token") !== null;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}>
            <CardMedia
                component="img"
                height={200}
                image={imagePath}
                alt={author.nombre}
                sx={{ borderRadius: "4px" }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {author.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author.biografia ? author.biografia.substring(0, 60) + "..." : "Sin biografía"}
                </Typography>
            </CardContent>

            <Stack spacing={1} sx={{ p: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/author/${author.id}`}
                    sx={{ borderRadius: "6px" }}
                >
                    Ver más
                </Button>

                {isLoggedIn && (
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                            variant="contained"
                            color="info"
                            size="small"
                            startIcon={<Edit />}
                            component={Link}
                            to={`/edit-author/${author.id}`}
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
                            onClick={() => onDelete(author.id)}
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