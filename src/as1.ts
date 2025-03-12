class Movie {
  constructor(
    public id: string,
    public title: string,
    public director: string,
    public releaseYear: number,
    public genre: string,
    public ratings: number[] = []
  ) {}
}

class MoviesManagement {
  private movies: Movie[] = [];

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addMovie(
    title: string,
    director: string,
    releaseYear: number,
    genre: string
  ): void {
    const id = this.generateId();
    const newMovie = new Movie(id, title, director, releaseYear, genre);
    this.movies.push(newMovie);
    console.log(`Added movie: ${title} with ID: ${id}`);
  }

  rateMovie(id: string, rating: number): void {
    const movie = this.movies.find((movie) => movie.id === id);
    if (movie && rating >= 1 && rating <= 5) {
      movie.ratings.push(rating);
      console.log(`Rated movie: ${movie.title} with ${rating} stars`);
    } else {
      console.log(`Failed to rate movie with id: ${id}`);
    }
  }

  getAverageRating(id: string): number | undefined {
    const movie = this.movies.find((movie) => movie.id === id);
    if (movie && movie.ratings.length > 0) {
      const total = movie.ratings.reduce((acc, rating) => acc + rating, 0);
      const average = total / movie.ratings.length;
      console.log(`Average rating for movie: ${movie.title} is ${average}`);
      return average;
    }
    console.log(`No ratings found for movie with id: ${id}`);
    return undefined;
  }

  getTopRatedMovies(): Movie[] {
    const topRatedMovies = this.movies
      .filter((movie) => movie.ratings.length > 0)
      .sort(
        (a, b) =>
          (this.getAverageRating(b.id) || 0) -
          (this.getAverageRating(a.id) || 0)
      );
    console.log(
      "Top rated movies:",
      topRatedMovies.map((movie) => movie.title)
    );
    return topRatedMovies;
  }

  getMoviesByGenre(genre: string): Movie[] {
    const moviesByGenre = this.movies.filter(
      (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
    );
    console.log(
      `Movies in genre ${genre}:`,
      moviesByGenre.map((movie) => movie.title)
    );
    return moviesByGenre;
  }

  getMoviesByDirector(director: string): Movie[] {
    const moviesByDirector = this.movies.filter(
      (movie) => movie.director.toLowerCase() === director.toLowerCase()
    );
    console.log(
      `Movies by director ${director}:`,
      moviesByDirector.map((movie) => movie.title)
    );
    return moviesByDirector;
  }

  searchMoviesBasedOnKeyword(keyword: string): Movie[] {
    const moviesByKeyword = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(
      `Movies with keyword ${keyword}:`,
      moviesByKeyword.map((movie) => movie.title)
    );
    return moviesByKeyword;
  }

  getMovie(id: string): Movie | undefined {
    const movie = this.movies.find((movie) => movie.id === id);
    if (movie) {
      console.log(`Found movie: ${movie.title}`);
    } else {
      console.log(`No movie found with id: ${id}`);
    }
    return movie;
  }

  removeMovie(id: string): void {
    const movie = this.getMovie(id);
    if (movie) {
      this.movies = this.movies.filter((movie) => movie.id !== id);
      console.log(`Removed movie: ${movie.title}`);
    } else {
      console.log(`No movie found with id: ${id}`);
    }
  }
}

// Test the MoviesManagement class
const moviesManagement = new MoviesManagement();

moviesManagement.addMovie("Inception", "Christopher Nolan", 2010, "Sci-Fi");
moviesManagement.addMovie(
  "The Dark Knight",
  "Christopher Nolan",
  2008,
  "Action"
);
moviesManagement.addMovie("Interstellar", "Christopher Nolan", 2014, "Sci-Fi");

const inceptionId = moviesManagement
  .getMoviesByGenre("Sci-Fi")
  .find((movie) => movie.title === "Inception")?.id;
const darkKnightId = moviesManagement
  .getMoviesByGenre("Action")
  .find((movie) => movie.title === "The Dark Knight")?.id;
const interstellarId = moviesManagement
  .getMoviesByGenre("Sci-Fi")
  .find((movie) => movie.title === "Interstellar")?.id;

if (inceptionId) {
  moviesManagement.rateMovie(inceptionId, 5);
  moviesManagement.rateMovie(inceptionId, 4);
}
if (darkKnightId) {
  moviesManagement.rateMovie(darkKnightId, 5);
}
if (interstellarId) {
  moviesManagement.rateMovie(interstellarId, 4);
}

console.log(
  "Average Rating of Inception:",
  inceptionId ? moviesManagement.getAverageRating(inceptionId) : "N/A"
);
console.log("Top Rated Movies:", moviesManagement.getTopRatedMovies());
console.log(
  "Movies by Genre Sci-Fi:",
  moviesManagement.getMoviesByGenre("Sci-Fi")
);
console.log(
  "Movies by Director Christopher Nolan:",
  moviesManagement.getMoviesByDirector("Christopher Nolan")
);
console.log(
  'Search Movies with keyword "Dark":',
  moviesManagement.searchMoviesBasedOnKeyword("Dark")
);
console.log(
  "Get Movie with ID of Inception:",
  inceptionId ? moviesManagement.getMovie(inceptionId) : "N/A"
);
if (inceptionId) {
  moviesManagement.removeMovie(inceptionId);
}
console.log(
  "Movies after removing Inception:",
  moviesManagement.getMoviesByDirector("Christopher Nolan")
);
