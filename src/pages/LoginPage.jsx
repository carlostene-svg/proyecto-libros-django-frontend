import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService"; 
import Spinner from "../components/Spinner";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(loginData.username, loginData.password);
            alert("¡Bienvenido al Sistema de Biblioteca!");
            navigate('/');
            window.location.reload(); 
        } catch (error) {
            console.error("Error during login:", error);
            alert("Usuario o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '70vh' 
            }}
        >
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2, 
                    maxWidth: 400, 
                    width: '100%' 
                }}
            >
                <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Identificación
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField 
                        label="Usuario" 
                        name="username" 
                        variant="outlined" 
                        value={loginData.username} 
                        onChange={handleChange} 
                        required 
                        fullWidth
                    /> 
                    <TextField 
                        label="Contraseña" 
                        name="password" 
                        type="password" 
                        variant="outlined" 
                        value={loginData.password} 
                        onChange={handleChange} 
                        required 
                        fullWidth
                    /> 
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        sx={{ mt: 1 }}
                    >
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}