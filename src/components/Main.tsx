import { useEffect, useState } from "react";
import Movie from "../models/Movie";
import {
  getMovieByCriteria,
  getMovieByTitle,
} from "../services/movieApiService";
import CriteriaForm from "./CriteriaForm";
import "./Main.css";
import ResultList from "./ResultList";
import SearchForm from "./SearchForm";

const Main = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [searchGenres, setSearchGenres] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [language, setLanguage] = useState("");
  const [showCriteria, setShowCriteria] = useState(false);
  const [buttonText, setButtonText] = useState("Serach by Criteria");
  const switchForm = () => {
    setShowCriteria((prev) => !prev);
    setSearchMovie("");
    setSearchGenres("");
    setSearchRating("");
    setLanguage("");
    buttonText !== "Search by Criteria"
      ? setButtonText("Search by Criteria")
      : setButtonText("Search by Title");
  };
  console.log(searchMovie);

  // const [criteriaMovie, setCriteriaMovie] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchMovie !== "") {
      getMovieByTitle(searchMovie).then((res) => setMovies(res.results));
    }
    console.log(movies);
  }, [searchMovie]);
  useEffect(() => {
    if (searchGenres || searchRating || language) {
      getMovieByCriteria(searchGenres, +searchRating, language).then((res) =>
        setMovies(res.results)
      );
    } else if (searchRating !== "") {
    }
  }, [searchGenres, searchRating, language]);
  return (
    <div className="Main">
      <button onClick={switchForm}>{buttonText}</button>
      {!showCriteria ? (
        <SearchForm setTerm={setSearchMovie} />
      ) : (
        <CriteriaForm
          chooseGenre={setSearchGenres}
          chooseRating={setSearchRating}
          chooseLanguage={setLanguage}
        />
      )}
      <ResultList movies={movies} />
    </div>
  );
};

export default Main;
