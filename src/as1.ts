interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  ratings: number[];
}

const movies: Movie[] = [];

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function addMovie(
  title: string,
  director: string,
  releaseYear: number,
  genre: string
): void {
  const id = generateId();
  const newMovie: Movie = { id, title, director, releaseYear, genre, ratings: [] };
  movies.push(newMovie);
  console.log(`Added movie: ${title} with ID: ${id}`);
}

function rateMovie(id: string, rating: number): void {
  const movie = movies.find((movie) => movie.id === id);
  if (movie && rating >= 1 && rating <= 5) {
    movie.ratings.push(rating);
    console.log(`Rated movie: ${movie.title} with ${rating} stars`);
  } else {
    console.log(`Failed to rate movie with id: ${id}`);
  }
}

function getAverageRating(id: string): number | undefined {
  const movie = movies.find((movie) => movie.id === id);
  if (movie && movie.ratings.length > 0) {
    const total = movie.ratings.reduce((acc, rating) => acc + rating, 0);
    const average = total / movie.ratings.length;
    console.log(`Average rating for movie: ${movie.title} is ${average}`);
    return average;
  }
  console.log(`No ratings found for movie with id: ${id}`);
  return undefined;
}

function getTopRatedMovies(): Movie[] {
  const topRatedMovies = movies
    .filter((movie) => movie.ratings.length > 0)
    .sort(
      (a, b) =>
        (getAverageRating(b.id) || 0) -
        (getAverageRating(a.id) || 0)
    );
  console.log('Top rated movies:', topRatedMovies.map(movie => movie.title));
  return topRatedMovies;
}

function getMoviesByGenre(genre: string): Movie[] {
  const moviesByGenre = movies.filter(
    (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
  );
  console.log(`Movies in genre ${genre}:`, moviesByGenre.map(movie => movie.title));
  return moviesByGenre;
}

function getMoviesByDirector(director: string): Movie[] {
  const moviesByDirector = movies.filter(
    (movie) => movie.director.toLowerCase() === director.toLowerCase()
  );
  console.log(`Movies by director ${director}:`, moviesByDirector.map(movie => movie.title));
  return moviesByDirector;
}

function searchMoviesBasedOnKeyword(keyword: string): Movie[] {
  const moviesByKeyword = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log(`Movies with keyword ${keyword}:`, moviesByKeyword.map(movie => movie.title));
  return moviesByKeyword;
}

function getMovie(id: string): Movie | undefined {
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    console.log(`Found movie: ${movie.title}`);
  } else {
    console.log(`No movie found with id: ${id}`);
  }
  return movie;
}

function removeMovie(id: string): void {
  const movie = getMovie(id);
  if (movie) {
    const index = movies.indexOf(movie);
    if (index > -1) {
      movies.splice(index, 1);
    }
    console.log(`Removed movie: ${movie.title}`);
  } else {
    console.log(`No movie found with id: ${id}`);
  }
}

// Test the functions
addMovie("Inception", "Christopher Nolan", 2010, "Sci-Fi");
addMovie("The Dark Knight", "Christopher Nolan", 2008, "Action");
addMovie("Interstellar", "Christopher Nolan", 2014, "Sci-Fi");

const inceptionId = getMoviesByGenre("Sci-Fi").find(movie => movie.title === "Inception")?.id;
const darkKnightId = getMoviesByGenre("Action").find(movie => movie.title === "The Dark Knight")?.id;
const interstellarId = getMoviesByGenre("Sci-Fi").find(movie => movie.title === "Interstellar")?.id;

if (inceptionId) {
  rateMovie(inceptionId, 5);
  rateMovie(inceptionId, 4);
}
if (darkKnightId) {
  rateMovie(darkKnightId, 5);
}
if (interstellarId) {
  rateMovie(interstellarId, 4);
}

console.log('Average Rating of Inception:', inceptionId ? getAverageRating(inceptionId) : 'N/A');
console.log('Top Rated Movies:', getTopRatedMovies());
console.log('Movies by Genre Sci-Fi:', getMoviesByGenre('Sci-Fi'));
console.log('Movies by Director Christopher Nolan:', getMoviesByDirector('Christopher Nolan'));
console.log('Search Movies with keyword "Dark":', searchMoviesBasedOnKeyword('Dark'));
console.log('Get Movie with ID of Inception:', inceptionId ? getMovie(inceptionId) : 'N/A');
if (inceptionId) {
  removeMovie(inceptionId);
}
console.log('Movies after removing Inception:', getMoviesByDirector('Christopher Nolan'));