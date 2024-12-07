import {getImgUrl, getMovieGenreById, getTvGenreById} from "./utils.js";
import notFoundImage from "../assets/image_not_find.jpg";

function getClasses(index) {
  if (window.innerWidth < 901) {
    return 'movie-item'
  }

  let unit= 5;

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

export default function MovieItem({video, index, mediaType, handleCardClick}) {
  return <div className={getClasses(index)}>
    <img src={
      video.backdrop_path === null || video.backdrop_path === undefined
        ? notFoundImage
        : getImgUrl(video.backdrop_path)
    } alt={mediaType === 'movie' ? video.title : video.name}/>
    <h3>{mediaType === 'movie' ? video.title : video.name}</h3>
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
        <div className="tooltip">
          Episodes and information
        </div>
        <div className="arrow"></div>
      </div>
      <div className="category">
        {
          video.genre_ids !== undefined
            ? video.genre_ids.slice(0, 3).map(
              genre_id => mediaType === 'movie'
                ? getMovieGenreById(genre_id)
                : getTvGenreById(genre_id)
            ).join('。')
          : 'No Category'
        }
      </div>
    </div>
  </div>
}