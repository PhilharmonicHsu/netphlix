import {useEffect, useRef, useState, forwardRef, useImperativeHandle} from "react";
import styles from './MainVideo.module.scss'
import {getImgUrl, registerYouTubeIframeAPI} from '../../utils/helper.js'
import MainVideoDialog from "../Dialog/MainVideoDialog.jsx";
import YoutubePlayer from "../../models/YoutubePlayer.js";
import ApiService from "../../services/ApiService.js";

const MainVideo = forwardRef(({mainVideo, mainPlayerRef, mainPlayerIdRef, dialogPlayerRef, isLightMode}, ref) => {
  const containerRef = useRef(null);
  const videoInfoRef = useRef(null);
  const dialog = useRef(null);
  const ddddRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [videoDetail, setVideoDetail] = useState({genres: []});
  const [videoCasts, setVideoCasts] = useState([]);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [movieVideo, setMovieVideo] = useState(null);

  useImperativeHandle(ref, () => ({
    playMainVideo: () => {
      playVideo();
      hiddenBackGroundImage()
      document.body.classList.remove(styles['modal-open']); // 禁用背景滾動
    },
    pauseMainVideo: () => {
      pauseVideo();
      showBackGroundImage();
      document.body.classList.add(styles['modal-open']); // 禁用背景滾動
    }
  }))

  function playVideo() {
    ddddRef.current.playVideo()
  }

  function pauseVideo() {
    ddddRef.current.pauseVideo()
  }

  function hiddenBackGroundImage() {
    videoInfoRef.current.style.opacity = "0"
  }

  function showBackGroundImage() {
    videoInfoRef.current.style.opacity = "1"
  }

  useEffect(() => {
    fetchApi()
  }, [])

  async function fetchApi() {
    const images = await ApiService.getImages(mainVideo.id);
    setMainImage(getImgUrl(images.backdrops[0].file_path))

    await getMovieVideos();

    const movieDetail = await ApiService.getMovieDetail(mainVideo.id, 'movie');
    setVideoDetail(movieDetail);

    const movieCasts = await ApiService.getMovieCasts(mainVideo.id, 'movie');
    setVideoCasts(movieCasts.cast)

    const relatedVideos = await ApiService.getRelatedVideos(mainVideo.id, 'movie');
    setSimilarVideos(relatedVideos.results)

    setLoading(false);

    setTimeout(() => {
      setIsPreview(true)
    }, 5000);
  }

  async function getMovieVideos() {
    let movieVideos = await ApiService.getMovieVideos(mainVideo.id, 'movie')

    setMovieVideo(() => movieVideos.results[0])
    mainPlayerIdRef.current = movieVideos.results[0].key;

    if (! window.YT) {
      registerYouTubeIframeAPI(() => {
        createPlayer(movieVideos.results[0].key)
        dialog.current.registerYtAPI()
      })
    }

    const handleResize = () => {
      if (mainPlayerRef.current && containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;

        mainPlayerRef.current.setSize(newWidth, (newWidth * 9) / 16);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }

  useEffect(() => {
    if (containerRef.current) {
      registerYouTubeIframeAPI(() => {
        createPlayer(mainPlayerIdRef.current)
        dialog.current.registerYtAPI()
      })
    }
  }, [containerRef.current])

  function createPlayer(videoId) {
    mainPlayerRef.current = new YoutubePlayer('youtube-player', videoId)
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autoplay()
      .hiddenControl()
      .mute()
      .onReady((event) => {
        ddddRef.current = mainPlayerRef.current;
      })
      .onStateChange((event) => {
        if (event.data === YoutubePlayer.PLAYER_STATE_ENDED) {
          showBackGroundImage()
        }
      })
      .build();
  }

  function openModal() {
    dialog.current.showModal(); // 確保已綁定後調用 showModal
    dialog.current.playDialogVideo();

    pauseVideo();
    showBackGroundImage();
    document.body.classList.add(styles['modal-open']); // 禁用背景滾動
  }

  function closeModal() {
    dialog.current.closeModal();
    dialog.current.pauseDialogVideo();

    hiddenBackGroundImage();
    playVideo()
    document.body.classList.remove(styles['modal-open']); // 禁用背景滾動
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>
    <div ref={containerRef} className={styles.container}>
      <div id="youtube-player" style={{border: "none"}}></div>
      <div
        ref={videoInfoRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: (window.innerWidth * 9) / 16,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${mainImage}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          backgroundPosition: 'center',
          opacity: "0",
          transition: 'opacity 0.5s ease'
        }}
      ></div>

      <div className={styles['main-info-cover']}>
        <div className={styles.dir} style={{
          width: window.innerWidth / 2,
          height: (window.innerWidth * 9) / 16,
        }}>
          <div className={`${styles['main-title']} ${isPreview ? styles['zoom-out'] : ''}`}>{mainVideo.title}</div>
          <h2 className={`${styles['main-release-day']} ${isPreview ? styles['hidden'] : ''}`}><strong>RELEASE
            DATE: {mainVideo.release_date}</strong></h2>
          <div className={`${styles['main-overview']} ${isPreview ? styles['hidden'] : ''}`}><em>{mainVideo.overview}</em></div>
          <div className={styles.buttons}>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: 'lightgray',
                color: 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              ▶ PLAY
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={openModal}
            >
              ⓘ INFO
            </button>
          </div>
        </div>
      </div>
    </div>
    <MainVideoDialog ref={dialog}
            closeModal={closeModal}
            videoDetail={videoDetail}
            similarVideos={similarVideos}
            videoCasts={videoCasts}
            ytVideoId={movieVideo.key}
            isMain={true}
            mediaType="movie"
            dialogPlayerRef={dialogPlayerRef}
            isLightMode={isLightMode}
    />
  </>
})

export default MainVideo;