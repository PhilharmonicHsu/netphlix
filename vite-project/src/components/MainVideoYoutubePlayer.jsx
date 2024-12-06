import { useEffect, useRef } from "react";

export default function MainVideoYoutubePlayer({videoId, showBackGroundImage}) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!window.YT || !window.YT.Player) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      }
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId, // 替換成你的影片 ID
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
          onReady: (event) => {
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              showBackGroundImage()
            }
          },
        },
      });
    }

    return () => {
      // 清理播放器資源，避免內存洩漏
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  });

  return <div id="youtube-player"></div>;
}