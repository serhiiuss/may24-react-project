import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import {ThemeProvider} from './switcher/ThemeSwitch';
import GenrePage from "./components/GenrePage";
import MovieByGenrePage from "./components/MovieByGenrePage";
import './App.css';

const App = () => {
  return (
      <ThemeProvider>
        <Router>
          <NavMenu/>
          <Routes>
            <Route path="/" element={<MoviesPage/>}/>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/movies/:id" element={<MovieDetailsPage/>}/>
            <Route path="/genres" element={<GenrePage/>}/>
            <Route path="/movies/genre/:genreId" element={<MovieByGenrePage/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
  );
};

export default App;
