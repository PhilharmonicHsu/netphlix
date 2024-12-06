import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from "./Dialog.module.scss";
import {getImgUrl} from "./utils.js";

const Dialog= forwardRef((
  {closeModal, videoDetail, similarVideos, videoCasts, ytVideoId, isMain, mediaType},
  ref
) => {
  const dialog = useRef(null);
  const dialogPlayerRef = useRef(null);
  const dialogInfoRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const ytFrameId = isMain ? ytVideoId + 'main' : ytVideoId;

  function showDialogBackGroundImage() {
    dialogInfoRef.current.style.opacity = "1"
  }

  useEffect(() => {
    if (mediaType === 'tv' && dialogInfoRef.current) {
      showDialogBackGroundImage()
    }
  });

  useImperativeHandle(ref, () => ({
    playDialogVideo: () => {
      dialogPlayerRef.current.playVideo();
    },
    pauseDialogVideo: () => {
      dialogPlayerRef.current.pauseVideo();
    },
    showModal: () => {
      dialog.current.showModal();
    },
    closeModal: () => {
      dialog.current.close();
    },
    registerYtAPI: () => {
      dialogPlayerRef.current = new window.YT.Player(ytFrameId, {
        videoId: ytVideoId, // 替換成你的影片 ID
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
          onReady: (event) => {
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              showDialogBackGroundImage()
            }
          },
        },
      });
    }
  }))

  function toggleExpand() {
    setIsExpanded((prev) => {
      const newState = ! prev;

      if (! newState) {
        document.querySelector(`#similar-${ytFrameId}`)
          .scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }

      return newState;
    });
  }

  return <dialog className={styles['main-dialog']}
                 ref={dialog}
                 onClose={closeModal}
                 style={{
                   animation: "scale-up 3s ease forwards",
                 }}
  >
    <div id={ytFrameId} style={
      mediaType === 'movie'
        ? {
          border: "none",
        }
        : {
          border: "none",
          width: '100%',
          height: '24rem',
        }
    }></div>
    <div
      ref={dialogInfoRef}
      style={{
        position: "absolute",
        top: '0',
        left: '0',
        width: '100%',
        height: '24rem',
        backgroundImage: `url('${getImgUrl(videoDetail.backdrop_path)}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        backgroundPosition: 'top right',
        opacity: "0",
        transition: 'opacity 0.5s ease'
      }}
    ></div>
    <div className={styles['dialog-header']}>
      <section className={styles['header']}>\
        <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>{
          mediaType === 'movie' ? videoDetail.title : videoDetail.name
        }</h1>
        <div className={styles['dialog-button-area']}>
          <button onClick={showDialogBackGroundImage}>▶ 播放</button>
        </div>
      </section>
    </div>
    <button className={styles['dialog-close-btn']} onClick={closeModal}>
      <svg className={styles['close-svg']} width="24" height="24" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="black"/>
      </svg>
    </button>
    <section className={styles.inform}>
      <div className={styles['inform-cell-left']}>
          <span>
            <span
              className={styles['small-text']}>Release at </span><strong><em>{
                mediaType === 'movie'
                  ? videoDetail.release_date.slice(0, 4)
                  : videoDetail.first_air_date.slice(0, 4)
              }</em></strong>
            <span className={styles['small-text']}>  Runtime: </span><strong><em>{
              mediaType === 'movie'
                ? videoDetail.runtime
                : videoDetail.episode_run_time[0]
            }</em></strong>
            <span className={styles['small-text']}>
              {
                mediaType === 'movie' ? ' mins' : ' episodes'
              }
            </span></span>
        <p>{videoDetail.overview}</p>
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
    <section id={`similar-${ytFrameId}`} className={styles.similar}>
      <h3>Similar: </h3>
      <div className={`${styles['similar-list']} ${isExpanded ? styles.expended : styles.collapsed}`}>
        {
          similarVideos.filter(video => video.backdrop_path).map((video, key) => <div key={key} className={styles.card}>
            <img src={getImgUrl(video.backdrop_path)} alt={mediaType === 'movie' ? video.title : video.name}/>
            <span className={styles['video-title']}>{mediaType === 'movie' ? video.title : video.name}</span>
            <div className={styles['similar-inform']}>
              <span className={styles['release-year']}>Release at <em>{
                mediaType === 'movie'
                  ? video.release_date.slice(0, 4)
                  : video.first_air_date.slice(0, 4)
              }</em></span>
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
            ? <img className={styles['company-logo']} src={getImgUrl(company.logo_path)} alt={company.name}/>
            : <span>{company.name}</span>
        )
      }
    </section>
  </dialog>
})

export default Dialog;