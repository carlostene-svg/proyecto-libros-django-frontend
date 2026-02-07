# React: Gestión de Autores y Libros 📚
**Estudiante**: Carlos Alejandro Tene Mora

## Descripción General
Este repositorio contiene la construcción de una aplicación completa de gestión bibliográfica usando React, Material UI y consumo de APIs REST con autenticación OAuth2.

## Estructura del Proyecto
### Archivos Principales
```
/src
  /components
    Header.jsx
    AuthorCard.jsx
    BookCard.jsx
  /pages
    AuthorList.jsx
    AuthorForm.jsx
    AuthorDetail.jsx
    BookList.jsx
    LoginPage.jsx
  /services
    AuthorService.js
    BookService.js
  .env
  main.jsx
  ```
## Configuración del Sistema
### Nuevas características
- Consumo de endpoints /api/autores/ y /api/libros/
- Autenticación OAuth2 con gestión de tokens en localStorage
- Interceptores de Axios para autorización automática
- Conversión de imágenes a base64 para carga de archivos
- Protección de rutas y sistema de logout

### Variables de entorno (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_AUTH_BASE_URL=http://localhost:8000/o
VITE_MEDIA_URL=http://localhost:8000
VITE_API_CLIENT_ID=tu_client_id
VITE_API_CLIENT_SECRET=tu_client_secret
```
## Instalación del proyecto

1. **Clonar el repositorio**
2. Abrir en VS Code la carpeta de tu repositorio clonado
3. Instalar las dependencias base:
   ```bash
   npm install
   ```
4. Instalar Material UI y sus dependencias:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```
5. Instalar Axios (necesario desde Laboratorio 10):
   ```bash
   npm install axios
   ```
6. Instalar React Router (necesario desde Laboratorio 11):
   ```bash
   npm install react-router-dom
   ```

### Comandos útiles
- Ejecutar el servidor de desarrollo
    ```bash
    npm run dev
    ```
- Comprobar versión de dependencias
    ```bash
    npm list
    ```
- Limpiar dependencias
    ```bash
    rm -rf node_modules
    npm install
    ```
### Comandos git
- Verificar los archivos modificados
    ```bash
    git status
    ```
- Agregar archivos al área de preparación
    ```bash
    git add .
    ```
- Realizar un commit
    ```bash
    git commit -m "descripción de cambios"
    ```
- Enviar los cambios a github
    ```bash
    git push
    ```