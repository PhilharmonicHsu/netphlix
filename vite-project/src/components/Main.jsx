import { useState, useEffect } from "react";
import MainVideo from "./MainVideo.jsx";
import SwiperVideos from "./SwiperVideos.jsx";
import {OPTIONS} from "./utils.js";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

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

  async function fetchApi() {
    await getPopularMovies();
    await getNowPlayingMovies();
    await getTopRatedMovies();
    await getUpcomingMovies();

    setIsLoading(false);
  }

  useEffect( () => {
    fetchApi();

  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>
    <MainVideo mainVideo={movies[0]} />
    <div style={{position: 'relative', height: '60rem'}}>
      <SwiperVideos videos={movies} category="trending">Trending</SwiperVideos>
      <SwiperVideos videos={nowPlayingMovies} category="now_playing">Now Playing</SwiperVideos>
      <SwiperVideos videos={topRatedMovies} category="top_rated">Top Rated</SwiperVideos>
      <SwiperVideos videos={upcomingMovies} category="upcoming">Upcoming</SwiperVideos>
    </div>
  </>
}