import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperVideo.scss'
import {registerYouTubeIframeAPI} from "../../utils/helper.js";
import {useRef, useState, useEffect} from "react";
import Dialog from "../Dialog/Dialog.jsx";
import classNames from "classnames";
import MovieItem from "../MovieItem/MovieItem.jsx";
import ApiService from "../../services/ApiService.js";

function getSwiperUnit() {
  if (window.innerWidth < 601) {
    return 1;
  } else if (window.innerWidth < 801) {
    return 2;
  } else if (window.innerWidth < 901) {
    return 3;
  } else if (window.innerWidth < 1190) {
    return 4;
  } else {
    return 5;
  }
}

export default function SwiperVideos({children, videos, category, mediaType, playMainVideo, pauseMainVideo, isLightMode}) {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [movieVideo, setMovieVideo] = useState(null);
  const [videoDetail, setVideoDetail] = useState({genres: []});
  const [videoCasts, setVideoCasts] = useState([]);
  const [similarVideos, setSimilarVideos] = useState([]);

  useEffect(() => {
    if (isDialogOpen && dialogRef.current) {
      if (mediaType === 'movie') {
        registerYouTubeIframeAPI(dialogRef.current.registerYtAPI)
      }
      dialogRef.current.showModal();
    }
  }, [isDialogOpen]);

  const handleCardClick = async (movieId) => {
    pauseMainVideo()

    const movieVideos = await ApiService.getMovieVideos(movieId, mediaType);
    setMovieVideo(() => movieVideos.results[0])

    const videoDetail = await ApiService.getMovieDetail(movieId, mediaType)
    setVideoDetail(videoDetail)

    const videoCasts = await ApiService.getMovieCasts(movieId, mediaType);
    setVideoCasts(videoCasts.cast)

    const relatedVideos = await ApiService.getRelatedVideos(movieId, mediaType);
    setSimilarVideos(relatedVideos.results)

    setIsDialogOpen(true);
  };

  const handleCloseModal = () => {
    playMainVideo()
    dialogRef.current.closeModal();
    setIsDialogOpen(false);
  };

  return <div className={category} >
    <div className={classNames({
      ['swiper-title']: true,
      ['light']: isLightMode
    })}>{children}</div>
    <Swiper modules={[Navigation]}
            spaceBetween={getSwiperUnit()}
            slidesPerView={getSwiperUnit()}
            slidesPerGroup={getSwiperUnit()}
            speed={2000}
            centeredSlides={false}
            loop
            navigation
    >
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MovieItem
            video={video}
            index={index}
            mediaType={mediaType}
            handleCardClick={handleCardClick}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    { isDialogOpen && <Dialog ref={dialogRef}
                              closeModal={handleCloseModal}
                              videoDetail={videoDetail}
                              similarVideos={similarVideos}
                              videoCasts={videoCasts}
                              ytVideoId={ mediaType === 'movie' ? movieVideo.key : null}
                              isMain={false}
                              mediaType={mediaType}
                              isLightMode={isLightMode}
    />}
  </div>
}