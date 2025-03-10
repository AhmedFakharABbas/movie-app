import MovieCard from "../components/movieCard";
import { useEffect, useState } from "react";
import { searchMovie, getPopularMovies } from "../services/api";
import "../css/home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState(""); //this is state whenevery update page will re renderd
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const popularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
        setError("Loading movies failes......");
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    popularMovies();

    console.log("hy from use effect");
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true)
    try {
      const searchResults = await searchMovie(searchQuery);
      setMovies(searchResults);
    } catch (error) {
      console.log(error);
      setError("Failed to search movies.....");
    } finally {
      setLoading(false);
    }
    // console.log("searched");
    // setSearchQuery("");
  };
  return (
    <div className=" home">
      <form onSubmit={onSearch} className="form-search">
        <input
          type="text"
          name="search"
          id="search"
          className="search-input"
          placeholder="search movie ...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div>loading......... </div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLocaleLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}
    </div>
  );
}
export default Home;
