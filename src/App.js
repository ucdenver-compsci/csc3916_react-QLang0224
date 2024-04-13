import React, { useEffect, useState } from 'react';
import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Authentication from './components/authentication';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';

function App() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch('https://csc3916-assignment5-qlang0224-148m.onrender.com');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setTopRatedMovies(data.movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <div>
            <MovieHeader />
            <Route exact path="/" render={() => <MovieList movies={topRatedMovies} />} />
            <Route exact path="/movielist" render={() => <MovieList movies={topRatedMovies} />} />
            <Route path="/signin" render={() => <Authentication />} />
          </div>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
