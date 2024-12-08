const API_URL = 'https://api.themoviedb.org/3'

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzI4NmIxZTkxN2VhNDJhNjRhNjdlYmYzOGFjYmU3ZiIsIm5iZiI6MTYzOTIyNjA0Ni42NzgwMDAyLCJzdWIiOiI2MWI0OWFiZTAzNzI2NDAwNDEyNDZjYzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fDCZu-3CtrFKsJ_9Ukx7XREJzjpJ72nR8CgN_X9ufMM'
  }
};

const ApiService = {
  getMovieVideos: async (videoId, mediaType) => {
    let response = await fetch(`${API_URL}/${mediaType}/${videoId}/videos?language=en-US`, OPTIONS)

    return await response.json()
  },
  getMovieDetail: async (videoId, mediaType) => {
    let response = await fetch(`${API_URL}/${mediaType}/${videoId}`, OPTIONS)

    return await response.json()
  },
  getMovieCasts: async (videoId, mediaType) => {
    let response = await fetch(`${API_URL}/${mediaType}/${videoId}/credits?api_key=4c286b1e917ea42a64a67ebf38acbe7f`, OPTIONS)

    return await response.json()
  },
  getRelatedVideos: async (videoId, mediaType) => {
    const url = (mediaType === 'movie')
      ? `${API_URL}/${mediaType}/${videoId}/similar?api_key=4c286b1e917ea42a64a67ebf38acbe7f&language=en-US&page=1`
      : `${API_URL}/${mediaType}/${videoId}/recommendations?api_key=4c286b1e917ea42a64a67ebf38acbe7f&language=en-US&page=1`

    let response = await fetch(url);

    return await response.json()
  },
  getPopularMovies: async () => {
    let response = await fetch(`${API_URL}/trending/movie/day?api_key=4c286b1e917ea42a64a67ebf38acbe7f`)

    return await response.json();
  },
  getNowPlayingMovies: async () => {
    let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', OPTIONS)

    return await response.json();
  },
  getTopRatedMovies: async () => {
    let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', OPTIONS)

    return await response.json();
  },
  getUpcomingMovies: async () => {
    let response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', OPTIONS)

    return await response.json()
  },
  getAiringTodayTVs: async () => {
    let response = await fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=4c286b1e917ea42a64a67ebf38acbe7f')

    return await response.json()
  },
  getOnTheAirTVs: async () => {
    let response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=4c286b1e917ea42a64a67ebf38acbe7f')

    return await response.json()
  },
  getPopularTVs: async () => {
    let response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=4c286b1e917ea42a64a67ebf38acbe7f')

    return await response.json()
  },
  getTopRatedTVs: async ()=> {
    let response = await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=4c286b1e917ea42a64a67ebf38acbe7f')

    return await response.json()
  },
  search: async (inputValue) => {
    let url = `${API_URL}/search/multi`;
    url += `?query=${inputValue}`

    let response = await fetch(url, OPTIONS)
    return await response.json()
  },
  getImages: async (videoId) => {
    let response = await fetch(`${API_URL}/movie/${videoId}/images`, OPTIONS)

    return await response.json()
  }
}

export default ApiService;