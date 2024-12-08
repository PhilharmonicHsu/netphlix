import './SearchedVideos.scss'
import {registerYouTubeIframeAPI} from "../../utils/helper.js";
import {useRef, useState, useEffect} from "react";
import Dialog from "../Dialog/Dialog.jsx";
import styles from "../MainVideo/MainVideo.module.scss";
import MovieItem from "../MovieItem/MovieItem.jsx";
import ApiService from "../../services/ApiService.js";

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
    const movieVideos = await ApiService.getMovieVideos(movie.id, movie.media_type);
    setMovieVideo(() => movieVideos.results[0])

    const videoDetail = await ApiService.getMovieDetail(movie.id, movie.media_type);
    setVideoDetail(videoDetail)

    const videoCasts = await ApiService.getMovieCasts(movie.id, movie.media_type);
    setVideoCasts(videoCasts.cast)

    const relatedVideos = await ApiService.getRelatedVideos(movie.id, movie.media_type);
    setSimilarVideos(relatedVideos.results)

    setIsDialogOpen(true);
    setSelectedMediaType(movie.media_type);
    document.body.classList.add(styles['modal-open']); // 禁用背景滾動
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false);
    dialogRef.current.closeModal();
    document.body.classList.remove(styles['modal-open']); // 禁用背景滾動
  };

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