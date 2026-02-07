import { AppBar, Button, Toolbar } from "@mui/material";
import logoDigital from "../assets/logo.png" 

import './Header.css'
import { logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Header(){
    const isLoggedIn = localStorage.getItem('access_token') !== null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        alert("Sesión cerrada correctamente");
        navigate('/login');
    }

    return(
        <header className="navbar-container">
            <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
                <Toolbar>
                    <div className="image-container">
                        {/* Aquí usamos tu logo.png */}
                        <img src={logoDigital} alt="Mundo Digital Logo" height={80} />
                    </div>
                </Toolbar>
                <Toolbar>
                    {/* Navegación usando navigate para evitar recargas de página */}
                    <Button color="inherit" onClick={() => navigate('/')}>Autores</Button>
                    <Button color="inherit" onClick={() => navigate('/libros')}>Libros</Button>
                    
                    {isLoggedIn && (
                        <Button color="inherit" onClick={handleLogout}> Cerrar Sesión </Button>
                    )}
                    
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={() => navigate('/login')}>Iniciar sesión</Button>
                    )}
                </Toolbar>
            </AppBar>
        </header>
    );
}