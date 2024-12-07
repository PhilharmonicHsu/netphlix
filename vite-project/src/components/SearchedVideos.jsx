import './SearchedVideos.scss'
import {OPTIONS, registerYouTubeIframeAPI} from "./utils.js";
import {useRef, useState, useEffect} from "react";
import Dialog from "./Dialog.jsx";
import styles from "./MainVideo.module.scss";
import MovieItem from "./MovieItem.jsx";

export default function SearchedVideos({videos, mediaType, playMainVideo, pauseMainVideo}) {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [movieVideo, setMovieVideo] = useState(null);
  const [videoDetail, setVideoDetail] = useState({genres: []});
  const [videoCasts, setVideoCasts] = useState([]);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState("movie");

  useEffect(() => {
    if (isDialogOpen && dialogRef.current) {
      if (selectedMediaType === 'movie') {
        registerYouTubeIframeAPI(dialogRef.current.registerYtAPI)
      }
      dialogRef.current.showModal();
    }
  }, [isDialogOpen, selectedMediaType, dialogRef.current]);

  const handleCardClick = async (movie) => {
    await getMovieVideos(movie.id, movie.media_type);
    await getMovieDetail(movie.id, movie.media_type);
    await getMovieCasts(movie.id, movie.media_type);
    await getSimilarVideos(movie.id, movie.media_type);

    setIsDialogOpen(true);
    setSelectedMediaType(movie.media_type);
    document.body.classList.add(styles['modal-open']); // 禁用背景滾動
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false);
    dialogRef.current.closeModal();
    document.body.classList.remove(styles['modal-open']); // 禁用背景滾動
  };

  async function getMovieVideos(movieId, mediaType) {
    let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?language=en-US`, OPTIONS)
    let data = await response.json()

    setMovieVideo(() => data.results[0])
  }

  async function getMovieDetail(movieId, mediaType) {
    let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}`, OPTIONS)
    let data = await response.json()

    setVideoDetail(data);
  }

  async function getMovieCasts(movieId, mediaType) {
    let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}/credits?api_key=4c286b1e917ea42a64a67ebf38acbe7f`, OPTIONS)
    let data = await response.json()

    setVideoCasts(data.cast)
  }

  async function getSimilarVideos(movieId, mediaType) {
    let response;

    if (mediaType === 'movie') {
      response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=4c286b1e917ea42a64a67ebf38acbe7f&language=en-US&page=1`, OPTIONS)
    } else {
      response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=4c286b1e917ea42a64a67ebf38acbe7f&language=en-US&page=1`, OPTIONS)
    }

    let data = await response.json()

    setSimilarVideos(data.results)
  }

  return <div className="searchedList">
    {videos.map((video, index) => (
        <MovieItem
          video={video}
          key={index}
          mediaType={video.media_type}
          handleCardClick={() => handleCardClick(video)}
        />
    ))}
    { isDialogOpen && <Dialog ref={dialogRef}
                              closeModal={handleCloseModal}
                              videoDetail={videoDetail}
                              similarVideos={similarVideos}
                              videoCasts={videoCasts}
                              ytVideoId={ selectedMediaType === 'movie' ? movieVideo.key : null}
                              isMain={false}
                              mediaType={selectedMediaType}
    />}
  </div>
}