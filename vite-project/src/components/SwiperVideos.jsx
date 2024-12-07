import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperVideo.scss'
import {OPTIONS, registerYouTubeIframeAPI} from "./utils.js";
import {useRef, useState, useEffect} from "react";
import Dialog from "./Dialog.jsx";
import classNames from "classnames";
import MovieItem from "./MovieItem.jsx";

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
    await getMovieVideos(movieId);
    await getMovieDetail(movieId);
    await getMovieCasts(movieId);
    await getSimilarVideos(movieId);

    setIsDialogOpen(true);
  };

  const handleCloseModal = () => {
    playMainVideo()
    dialogRef.current.closeModal();
    setIsDialogOpen(false);
  };

  async function getMovieVideos(movieId) {
    console.log(`https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?language=en-US`)
    let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?language=en-US`, OPTIONS)
    let data = await response.json()

    setMovieVideo(() => data.results[0])
  }

  async function getMovieDetail(movieId) {
    let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}`, OPTIONS)
    let data = await response.json()

    setVideoDetail(data);
  }

  async function getMovieCasts(movieId) {
    let response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}/credits?api_key=4c286b1e917ea42a64a67ebf38acbe7f`, OPTIONS)
    let data = await response.json()

    setVideoCasts(data.cast)
  }

  async function getSimilarVideos(movieId) {
    let response;

    if (mediaType === 'movie') {
      response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}/similar?api_key=4c286b1e917ea42a64a67ebf38acbe7f&language=en-US&page=1`, OPTIONS)
    } else {
      response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}/recommendations?api_key=4c286b1e917ea42a64a67ebf38acbe7f&language=en-US&page=1`, OPTIONS)
    }

    let data = await response.json()

    setSimilarVideos(data.results)
  }

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