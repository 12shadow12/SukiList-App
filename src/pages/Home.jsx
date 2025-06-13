import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularAnimeMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load movies once
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularAnimeMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Manual Search by clicking on Search Button
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  // Searches for movies automatically when user types something
  useEffect(() => 
  {
    const fetchSearchResults = async () => 
      {
        // if query is empty, load popular movies instead
        if (!searchQuery.trim())
        {
          try 
          {
            const popularMovies = await getPopularAnimeMovies();
            setMovies(popularMovies);
            setError(null)
            return;
          } 
          catch (err)
          {
            console.log(err)
            setError("Failed to search movies...")
          }
          finally 
          {
            setLoading(false)
          }
        }
        // if query is not empty, then load the movies.
        setLoading(true);
        try
        {
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
          setError(null)
        }
        catch (err)
        {
          console.log(err)
          setError("Failed to search movies...")
        }
        finally 
        {
          setLoading(false)
        }

      }
      // Prevents unnescessary API calls on every keystroke
      const delayDebounce = setTimeout(() => {
        fetchSearchResults();
      }, 300);

      return () => clearTimeout(delayDebounce) // resets timeout when user types before 300ms

  }, [searchQuery]);
  

  // Search bar and Movie Grid UI
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;