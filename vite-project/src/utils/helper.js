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

export function getImgUrl(posterPath) {
  return `https://image.tmdb.org/t/p/w780/${posterPath}`
}

export function registerYouTubeIframeAPI(callback) {
  if (window.YT && window.YT.Player) {
    callback();
  } else {
    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api'
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      callback()
    }
  }
}