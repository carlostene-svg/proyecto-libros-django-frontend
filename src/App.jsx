import { Container } from '@mui/material'
import Header from './components/Header'
import AuthorList from './pages/AuthorList'
import AuthorForm from './pages/AuthorForm'
import AuthorDetail from './pages/AuthorDetail'
import BookList from './pages/BookList'
import BookForm from './pages/BookForm'
import BookDetail from './pages/BookDetail'
import LoginPage from './pages/LoginPage'
import "./services/AuthorService"; 
import "./services/BookService";

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Rutas para Autores */}
            <Route path='/' element={<AuthorList />} />
            <Route path='/add-author' element={<AuthorForm />} />
            <Route path='/edit-author/:id' element={<AuthorForm />} />
            <Route path='/author/:id' element={<AuthorDetail />} />
            
            {/* Rutas para Libros */}
            <Route path="/libros" element={<BookList />} />
            <Route path="/add-book" element={<BookForm />} />
            <Route path="/edit-book/:id" element={<BookForm />} />
            <Route path="/book/:id" element={<BookDetail />} />

            {/* Login */}
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App