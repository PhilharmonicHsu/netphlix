const API_URL = 'https://api.themoviedb.org/3'

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiAuthorization = import.meta.env.VITE_TMDB_AUTHORIZATION;

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiAuthorization}`
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
    let response = await fetch(`${API_URL}/${mediaType}/${videoId}/credits?api_key=${apiKey}`, OPTIONS)

    return await response.json()
  },
  getRelatedVideos: async (videoId, mediaType) => {
    const url = (mediaType === 'movie')
      ? `${API_URL}/${mediaType}/${videoId}/similar?api_key=${apiKey}&language=en-US&page=1`
      : `${API_URL}/${mediaType}/${videoId}/recommendations?api_key=${apiKey}&language=en-US&page=1`

    let response = await fetch(url);

    return await response.json()
  },
  getPopularMovies: async () => {
    let response = await fetch(`${API_URL}/trending/movie/day?api_key=${apiKey}`)

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
    let response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`)

    return await response.json()
  },
  getOnTheAirTVs: async () => {
    let response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}`)

    return await response.json()
  },
  getPopularTVs: async () => {
    let response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)

    return await response.json()
  },
  getTopRatedTVs: async ()=> {
    let response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`)

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