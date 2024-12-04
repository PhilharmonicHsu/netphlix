import {useEffect, useRef, useState} from "react";
import styles from './MainVideo.module.scss'
import {OPTIONS} from './utils.js'

function getImgUrl(posterPath) {
  return `https://image.tmdb.org/t/p/w780/${posterPath}`
}

export default function MainVideo({mainVideo}) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const videoInfoRef = useRef(null);
  const dialog = useRef(null);
  const dialogPlayerRef = useRef(null);
  const dialogInfoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [videoDetail, setVideoDetail] = useState({genres: []});
  const [videoCasts, setVideoCasts] = useState([]);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  async function getMovieVideos() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${mainVideo.id}/videos?language=en-US`, OPTIONS)
    let data = await response.json()

    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api'
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    // 初始化播放器
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: data.results[0].key, // 替換成你的影片 ID
        width: window.innerWidth,
        height: (window.innerWidth * 9) / 17,
        playerVars: {
          autoplay: 1, // 自動播放
          controls: 0, // 隱藏控制器
          modestbranding: 1, // 隱藏大型 YouTube 標誌
          rel: 1, // 不顯示相關影片
          fs: 0, // 隱藏全螢幕按鈕
          iv_load_policy: 3, // 隱藏註解
          mute: 1, // 靜音播放
          showinfo: 0
        },
        events: {
          onReady: (event) => {},
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              showBackGroundImage()
            }
          },
        },
      });

      dialogPlayerRef.current = new window.YT.Player('dialog-player', {
        videoId: data.results[0].key, // 替換成你的影片 ID
        width: '100%',
        playerVars: {
          autoplay: 1, // 自動播放
          controls: 0, // 隱藏控制器
          modestbranding: 1, // 隱藏大型 YouTube 標誌
          rel: 1, // 不顯示相關影片
          fs: 0, // 隱藏全螢幕按鈕
          iv_load_policy: 3, // 隱藏註解
          mute: 1, // 靜音播放
          showinfo: 0
        },
        events: {
          onReady: (event) => {},
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              showDialogBackGroundImage()
            }
          },
        },
      });
    };

    const handleResize = () => {
      if (playerRef.current && containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        playerRef.current.setSize(newWidth, (newWidth * 9) / 16);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }

  async function getImages() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${mainVideo.id}/images`, OPTIONS)
    let data = await response.json()

    setMainImage(getImgUrl(data.backdrops[0].file_path))
  }

  async function getMovieDetail() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${mainVideo.id}`, OPTIONS)
    let data = await response.json()

    setVideoDetail(data);
  }

  async function getMovieCasts() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${mainVideo.id}/credits?api_key=4c286b1e917ea42a64a67ebf38acbe7f`, OPTIONS)
    let data = await response.json()

    setVideoCasts(data.cast)
  }

  async function getSimilarVideos() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${mainVideo.id}/similar?api_key=4c286b1e917ea42a64a67ebf38acbe7f&language=en-US&page=1`, OPTIONS)
    let data = await response.json()

    setSimilarVideos(data.results)
  }

  async function fetchApi() {
    await Promise.all([
      getImages(),
      getMovieVideos(),
      getMovieDetail(),
      getMovieCasts(),
      getSimilarVideos()
    ]);

    setLoading(false);

    setTimeout(() => {
      setIsPreview(true)
    }, 2000);
  }

  useEffect(() => {
    fetchApi()
  }, [])

  function hiddenBackGroundImage() {
    videoInfoRef.current.style.opacity = "0"
  }

  function showBackGroundImage() {
    videoInfoRef.current.style.opacity = "1"
  }

  function playVideo() {
    playerRef.current.playVideo()
  }

  function pauseVideo() {
    playerRef.current.pauseVideo()
  }

  function showDialogBackGroundImage() {
    dialogInfoRef.current.style.opacity = "1"
  }

  function playDialogVideo() {
    dialogPlayerRef.current.playVideo();
  }

  function pauseDialogVideo() {
    dialogPlayerRef.current.pauseVideo();
  }

  function openModal() {
    dialog.current.showModal(); // 確保已綁定後調用 showModal
    playDialogVideo();

    pauseVideo();
    showBackGroundImage();
    document.body.classList.add(styles['modal-open']); // 禁用背景滾動
  }

  function closeModal() {
    dialog.current.close();
    pauseDialogVideo();

    hiddenBackGroundImage();
    playVideo()
    document.body.classList.remove(styles['modal-open']); // 禁用背景滾動
  }

  function toggleExpand() {
    setIsExpanded((prev) => {
      const newState = ! prev;

      if (! newState) {
        document.querySelector(`.${styles.similar}`).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return newState;
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>
    <div ref={containerRef} style={{
      width: "100%",
      position: "relative"
    }}
    >
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

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        color: "white",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: '3rem',
        paddingLeft: '5rem',
      }}>
        <div className={styles.dir} style={{
          width: window.innerWidth / 2,
          height: (window.innerWidth * 9) / 16,
        }}>
          <h1 className={`${styles['main-title']} ${isPreview ? styles['zoom-out'] : ''}`}>{mainVideo.title}</h1>
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
              ▶ 播放
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
              ⓘ 詳情
            </button>
          </div>
        </div>
      </div>
    </div>
    <dialog id="main-dialog" className={styles['main-dialog']} ref={dialog} onClose={closeModal}>
      <div id="dialog-player" style={{border: "none"}}></div>
      <div
        ref={dialogInfoRef}
        style={{
          position: "absolute",
          top: '0',
          left: '0',
          width: '100%',
          height: '24rem',
          backgroundImage: `url('${mainImage}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          backgroundPosition: 'top right',
          opacity: "0",
          transition: 'opacity 0.5s ease'
        }}
      ></div>
      <div className={styles['dialog-header']}>
        <section className={styles['header']}>
          <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>{videoDetail.title}</h1>
          <div className={styles['dialog-button-area']}>
            <button onClick={showDialogBackGroundImage}>▶ 播放</button>
          </div>
        </section>
      </div>
      <button className={styles['dialog-close-btn']} onClick={closeModal}>
        <svg className={styles['close-svg']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                fill="black"/>
        </svg>
      </button>
      <section className={styles.inform}>
        <div className={styles['inform-cell-left']}>
          <span>
            <span className={styles['small-text']}>Release at </span><strong><em>{videoDetail.release_date.slice(0, 4)}</em></strong>
            <span className={styles['small-text']}>  Runtime: </span><strong><em>{videoDetail.runtime}</em></strong>
            <span className={styles['small-text']}> mins</span></span>
          <p>{mainVideo.overview}</p>
        </div>
        <div className={styles['inform-cell-right']}>
          <span><span className={styles.gray}>Casts:</span> {" "}
            {
              videoCasts.slice(0, 4).map((cast, i) => cast.name).join(', ')
            }
          </span>
          <br/>
          <span>
            <span className={styles.gray}>Genres:</span> {" "}
            {videoDetail.genres && videoDetail.genres.map(detail => detail.name).join(', ')}
          </span>
        </div>
      </section>
      <section className={styles.similar}>
        <h3>Similar: </h3>
        <div className={`${styles['similar-list']} ${isExpanded ? styles.expended : styles.collapsed}`}>
          {
            similarVideos.filter(video => video.backdrop_path).map((video, key) => <div key={key} className={styles.card}>
              <img src={getImgUrl(video.backdrop_path)} alt={video.title}/>
              <span className={styles['video-title']}>{video.title}</span>
              <div className={styles['similar-inform']}>
                <span className={styles['release-year']}>Release at <em>{video.release_date.slice(0, 4)}</em></span>
                {
                  (video.overview.length >= 180)
                    ? <p>{video.overview.slice(0, 200)}...</p>
                    : <p>{video.overview.slice(0, 200)}</p>
                }
              </div>
            </div>)
          }
        </div>

        <button className={styles['toggle-button']} onClick={toggleExpand}>
          {isExpanded ? "▲" : "▼"}
        </button>
      </section>
      <section className={styles.companies}>
        {
          videoDetail.production_companies.map(
            company => company.logo_path
              ? <img className={styles['company-logo']} src={getImgUrl(company.logo_path)} alt={company.name} />
              : <span>{company.name}</span>
          )
        }
      </section>
    </dialog>
  </>
}