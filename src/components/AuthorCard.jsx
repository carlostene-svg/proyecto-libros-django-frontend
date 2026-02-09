import { Button, Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AuthorCard({ author, onDelete }) {
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    const imagePath = `${mediaUrl}/${author.imagen}`;

    const isLoggedIn = localStorage.getItem("access_token") !== null;
    console.log(author)
    return (
        <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', maxWidth: 301, margin: '0 auto', justifyContent: 'space-between'}}>
            <CardMedia
                component="img"
                height={200}
                image={imagePath}
                alt={author.nombre}
                sx={{ borderRadius: "4px", objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {author.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author.biografia ? author.biografia.substring(0, 50) + "..." : "Sin biografía"}
                </Typography>
            </CardContent>

            <Stack spacing={1}>
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
                    <Stack direction="row" spacing={1}>
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