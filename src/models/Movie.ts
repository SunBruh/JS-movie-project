export default interface Movie {
  poster_path: string;
  original_title: string;
  id: number;
  overview: string;
  vote_count: number;
  vote_average: number;
  language: number;
  genre_ids: number[];
  backdrop_path: string;
  release_date: string;
}
