import './SearchedVideos.scss'
import {getMovieGenreById, getTvGenreById, getImgUrl, OPTIONS} from "./utils.js";
import {useRef, useState, useEffect} from "react";
import Dialog from "./Dialog.jsx";

function getClasses(index) {
  if (window.innerWidth < 901) {
    return 'movie-item'
  }

  let unit = 5;

  if (window.innerWidth < 1190) {
    unit = 4;
  }

  if (index % unit === 0) {
    return 'movie-item-left'
  } else if (index % unit === (unit - 1)) {
    return 'movie-item-right'
  }

  return 'movie-item'
}

function MovieItem({video, index, mediaType, handleCardClick}) {
  return <div className={getClasses(index)}>
    <img src={getImgUrl(video.backdrop_path)} alt={video.title}/>
    {
      mediaType === 'movie'
        ? <h3>{video.title}</h3>
        : <h3>{video.name}</h3>
    }
    <div className="simple_info">
      <div className="buttons">
        <button className="play_btn">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5.14001V19.14L19 12.14L8 5.14001Z" fill="black"/>
          </svg>
        </button>
        <button className="info_btn" onClick={() => handleCardClick(video.id)}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.11998 9.28995L12 13.1699L15.88 9.28995C15.9726 9.19736 16.0825 9.12392 16.2034 9.07382C16.3244 9.02371 16.454 8.99792 16.585 8.99792C16.7159 8.99792 16.8456 9.02371 16.9665 9.07382C17.0875 9.12392 17.1974 9.19736 17.29 9.28995C17.3826 9.38253 17.456 9.49244 17.5061 9.6134C17.5562 9.73437 17.582 9.86401 17.582 9.99495C17.582 10.1259 17.5562 10.2555 17.5061 10.3765C17.456 10.4975 17.3826 10.6074 17.29 10.6999L12.7 15.2899C12.6075 15.3826 12.4976 15.4562 12.3766 15.5064C12.2556 15.5566 12.1259 15.5824 11.995 15.5824C11.864 15.5824 11.7343 15.5566 11.6134 15.5064C11.4924 15.4562 11.3825 15.3826 11.29 15.2899L6.69998 10.6999C6.60727 10.6074 6.53372 10.4975 6.48354 10.3766C6.43336 10.2556 6.40753 10.1259 6.40753 9.99495C6.40753 9.86398 6.43336 9.73429 6.48354 9.61332C6.53372 9.49235 6.60727 9.38246 6.69998 9.28995C7.08998 8.90995 7.72998 8.89995 8.11998 9.28995Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div className="category">
        {
          video.genre_ids.slice(0, 3).map(
            genre_id => mediaType === 'movie'
              ? getMovieGenreById(genre_id)
              : getTvGenreById(genre_id)
          ).join('。')
        }
      </div>
    </div>
  </div>
}

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
        if (window.YT && window.YT.Player) {
          dialogRef.current.registerYtAPI();
        } else {
          console.log('window.onYouTubeIframeAPIReady')
          window.onYouTubeIframeAPIReady = () => {
            dialogRef.current.registerYtAPI();
          };
        }
      }
      dialogRef.current.showModal();
    }
  }, [isDialogOpen, selectedMediaType]);

  const handleCardClick = async (movie) => {
    await getMovieVideos(movie.id, movie.media_type);
    await getMovieDetail(movie.id, movie.media_type);
    await getMovieCasts(movie.id, movie.media_type);
    await getSimilarVideos(movie.id, movie.media_type);

    setIsDialogOpen(true);
    setSelectedMediaType(movie.media_type);
  };

  const handleCloseModal = () => {
    setIsDialogOpen(false);
    dialogRef.current.close();
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
          index={index}
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