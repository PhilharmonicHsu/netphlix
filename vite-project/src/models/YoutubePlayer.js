class YoutubePlayer {
  static PLAYER_STATE_ENDED = 0;

  constructor(DomId, videoId) {
    this.DomId = DomId;
    this.value = {
      videoId: videoId,
      playerVars: {
        modestbranding: 1,
        rel: 1,
        fs: 0,
        iv_load_policy: 3,
        showinfo: 0
      },
      events: {},
    };
  }

  width(width) {
    this.value['width'] = width;

    return this
  }

  height(height) {
    this.value['height'] = height;

    return this;
  }

  autoplay(isAutoplay = true) {
    this.value.playerVars['autoplay'] = Number(isAutoplay);

    return this;
  }

  hiddenControl(isHidden = true) {
    this.value.playerVars['controls'] = Number(! isHidden);

    return this;
  }

  mute(isMute = true) {
    this.value.playerVars['mute'] = Number(isMute);

    return this;
  }

  onReady(callback) {
    this.value.events['onReady'] = callback;

    return this;
  }

  onStateChange(callback) {
    this.value.events['onStateChange'] = callback;

    return this;
  }

  build() {
    return new window.YT.Player(
      this.DomId,
      this.value
    )
  }
}

export default YoutubePlayer;