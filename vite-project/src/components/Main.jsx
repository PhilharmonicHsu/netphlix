import {useState, useEffect, useRef} from "react";
import MainVideo from "./MainVideo/MainVideo.jsx";
import SwiperVideos from "./SwiperVideo/SwiperVideos.jsx";
import SearchedVideos from "./SearchedVideos/SearchedVideos.jsx";
import ApiService from "../services/ApiService.js";

export default function Main({value, isLightMode}) {
  const mainVideoRef = useRef(null);
  const mainPlayerRef = useRef(null);
  const mainPlayerIdRef = useRef(null);
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
  const mainList = [
    {
      name: 'trending',
      mediaType: 'movie',
      title: 'Trending',
      videos: movies
    },
    {
      name: 'now_playing',
      mediaType: 'movie',
      title: 'Now Playing',
      videos: nowPlayingMovies
    },
    {
      name: 'top_rated',
      mediaType: 'movie',
      title: 'Top Rated',
      videos: topRatedMovies
    },
    {
      name: 'upcoming',
      mediaType: 'movie',
      title: 'Upcoming',
      videos: upcomingMovies
    },
    {
      name: 'airing_today',
      mediaType: 'tv',
      title: 'Airing Today',
      videos: airingTodayTVs
    },
    {
      name: 'on_the_air',
      mediaType: 'tv',
      title: 'On The Air',
      videos: onTheAirTVs
    },
    {
      name: 'popular_tv',
      mediaType: 'tv',
      title: 'Popular TV',
      videos: popularTVs
    },
    {
      name: 'top_rated_tv',
      mediaType: 'tv',
      title: 'Top Rated TV',
      videos: topRatedTVs
    },
  ]

  async function fetchApi() {
    const popularMovies = await ApiService.getPopularMovies();
    setMovies(popularMovies.results);

    const nowPlayingMovies = await ApiService.getNowPlayingMovies();
    setNowPlayingMovies(nowPlayingMovies.results)

    const topRatedMovies = await ApiService.getTopRatedMovies();
    setTopRatedMovies(topRatedMovies.results);

    const upcomingMovies = await ApiService.getUpcomingMovies();
    setUpcomingMovies(upcomingMovies.results);

    const AiringTodayTVShows = await ApiService.getAiringTodayTVs();
    setAiringTodayTVs(AiringTodayTVShows.results);

    const onTheAirTVShows = await ApiService.getOnTheAirTVs();
    setOnTheAirTVs(onTheAirTVShows.results);

    const popularTVShows = await ApiService.getPopularTVs();
    setPopularTVs(popularTVShows.results);

    const topRatedTVShows = await ApiService.getTopRatedTVs();
    setTopRateTVs(topRatedTVShows.results);

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
    <main style={{
      backgroundColor: isLightMode ? 'white' : 'black'
    }}>
      {
        (value.length === 0) ?
          <>
            <MainVideo ref={mainVideoRef}
                       mainVideo={movies[0]}
                       mainPlayerRef={mainPlayerRef}
                       mainPlayerIdRef={mainPlayerIdRef}
                       dialogPlayerRef={dialogPlayerRef}
                       isLightMode={isLightMode}
            />
            <div style={{position: 'relative', height: '125rem'}}>
              {
                mainList.map((item, index) => (
                  <SwiperVideos key={index}
                                videos={item.videos}
                                category={item.name}
                                mediaType={item.mediaType}
                                playMainVideo={playMainVideo}
                                pauseMainVideo={pauseMainVideo}
                                isLightMode={isLightMode}
                  >
                    {item.title}
                  </SwiperVideos>
                ))
              }
            </div>
          </>
          :
          <SearchedVideos videos={value}></SearchedVideos>
    }
    </main>
  </>
}