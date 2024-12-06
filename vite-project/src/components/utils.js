export function getMovieGenreById(genreId) {
  const dd = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  }

  return dd[genreId];
}

export function getTvGenreById(genreId) {
  const dd = {
    10759: 'Action & Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    10762: 'Kids',
    9648: 'Mystery',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
    37: 'Western',
  }

  return dd[genreId];
}

export const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzI4NmIxZTkxN2VhNDJhNjRhNjdlYmYzOGFjYmU3ZiIsIm5iZiI6MTYzOTIyNjA0Ni42NzgwMDAyLCJzdWIiOiI2MWI0OWFiZTAzNzI2NDAwNDEyNDZjYzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fDCZu-3CtrFKsJ_9Ukx7XREJzjpJ72nR8CgN_X9ufMM'
  }
};

export function getImgUrl(posterPath) {
  return `https://image.tmdb.org/t/p/w780/${posterPath}`
}