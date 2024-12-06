import {useState, useEffect, useRef} from "react";
import MainVideo from "./MainVideo.jsx";
import SwiperVideos from "./SwiperVideos.jsx";
import {OPTIONS} from "./utils.js";
import SearchedVideos from "./SearchedVideos.jsx";

export default function Main({value}) {
  const mainVideoRef = useRef(null);
  const mainPlayerRef = useRef(null);
  const dialogPlayerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [airingTodayTVs, setAiringTodayTVs] = useState([]);
  const [onTheAirTVs, setOnTheAirTVs] = useState([]);
  const [popularTVs, setPopularTVs] = useState([]);
  const [topRatedTVs, setTopRateTVs] = useState([]);

  console.log('main:', value)

  async function getPopularMovies() {
    let response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=4c286b1e917ea42a64a67ebf38acbe7f')
    let data = await response.json()

    setMovies(data.results);
  }

  async function getNowPlayingMovies() {
    let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', OPTIONS)
    let data = await response.json()

    setNowPlayingMovies(data.results)
  }

  async function getTopRatedMovies() {
    let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', OPTIONS)
    let data = await response.json()

    setTopRatedMovies(data.results)
  }

  async function getUpcomingMovies() {
    let response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', OPTIONS)
    let data = await response.json()

    setUpcomingMovies(data.results)
  }

  async function getAiringTodayTVs() {
    let response = await fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=4c286b1e917ea42a64a67ebf38acbe7f')
    let data = await response.json()

    setAiringTodayTVs(data.results)
  }

  async function getOnTheAirTVs() {
    let response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=4c286b1e917ea42a64a67ebf38acbe7f')
    let data = await response.json()

    setOnTheAirTVs(data.results)
  }

  async function getPopularTVs() {
    let response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=4c286b1e917ea42a64a67ebf38acbe7f')
    let data = await response.json()

    setPopularTVs(data.results)
  }

  async function getTopRatedTVs() {
    let response = await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=4c286b1e917ea42a64a67ebf38acbe7f')
    let data = await response.json()

    setTopRateTVs(data.results)
  }

  async function fetchApi() {
    await getPopularMovies();
    await getNowPlayingMovies();
    await getTopRatedMovies();
    await getUpcomingMovies();
    await getAiringTodayTVs();
    await getOnTheAirTVs();
    await getPopularTVs();
    await getTopRatedTVs();

    setIsLoading(false);
  }

  useEffect( () => {
    fetchApi();

  }, [])

  function playMainVideo() {
    mainVideoRef.current.playMainVideo();
  }

  function pauseMainVideo() {
    mainVideoRef.current.pauseMainVideo();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>
    <main>
      {
        (value.length === 0) ?
          <>
            <MainVideo ref={mainVideoRef} mainVideo={movies[0]} mainPlayerRef={mainPlayerRef} dialogPlayerRef={dialogPlayerRef} />
            <div style={{position: 'relative', height: '125rem'}}>
              <SwiperVideos videos={movies} category="trending" mediaType="movie" playMainVideo={playMainVideo}
                            pauseMainVideo={pauseMainVideo}>Trending</SwiperVideos>
              <SwiperVideos videos={nowPlayingMovies} category="now_playing" mediaType="movie" playMainVideo={playMainVideo}
                            pauseMainVideo={pauseMainVideo}>Now Playing</SwiperVideos>
              <SwiperVideos videos={topRatedMovies} category="top_rated" mediaType="movie" playMainVideo={playMainVideo}
                            pauseMainVideo={pauseMainVideo}>Top Rated</SwiperVideos>
              <SwiperVideos videos={upcomingMovies} category="upcoming" mediaType="movie" playMainVideo={playMainVideo}
                            pauseMainVideo={pauseMainVideo}>Upcoming</SwiperVideos>
              <SwiperVideos videos={airingTodayTVs} category="airing_today" mediaType="tv" playMainVideo={playMainVideo}
                            pauseMainVideo={pauseMainVideo}>Airing Today</SwiperVideos>
              <SwiperVideos videos={onTheAirTVs} category="on_the_air" mediaType="tv" playMainVideo={playMainVideo}
                            pauseMainVideo={pauseMainVideo}>On The Air</SwiperVideos>
              <SwiperVideos videos={popularTVs} category="popular_tv" mediaType="tv">Popular TV</SwiperVideos>
              <SwiperVideos videos={topRatedTVs} category="top_rated_tv" mediaType="tv">Top Rated TV</SwiperVideos>
            </div>
          </>
          :
          <SearchedVideos videos={value}></SearchedVideos>
    }


    </main>
  </>
}