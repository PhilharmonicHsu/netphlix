import {useRef, useState, useEffect} from 'react';
import styles from './Header.module.scss';
import classNames from "classnames";
import {OPTIONS} from "./utils.js";

export default function Header({updateValue, handleChangeMode, isLightMode}) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(1000); // 倒數時間（初始值）
  const [isRunning, setIsRunning] = useState(false); // 控制是否開始倒數

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 500);
      }, 500);
    } else if (timeLeft === 0) {
      setIsRunning(false); // 倒數結束後停止計時

      if (isRunning) {
        search(); // 僅在 `isRunning` 為 `true` 時執行
      }
    }

    return () => clearInterval(timer); // 清除計時器
  }, [isRunning, timeLeft]);

  // 開始倒數
  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  function onChange(event) {
    handleReset();
    handleStart();
    setInputValue(event.target.value);
    if (event.target.value === null || event.target.value === '') {
      setIsRunning(false);
      updateValue([])
    }
  }

  // 重置倒數
  const handleReset = () => {
    console.log('reset timer');

    setIsRunning(false);
    setTimeLeft(1000); // 將倒數時間重置為初始值
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => ! prev);
  };

  async function search() {
    let url = 'https://api.themoviedb.org/3/search/multi';
    url += `?query=${inputValue}`

    let response = await fetch(url, OPTIONS)
    let data = await response.json()
    updateValue(data.results)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // 獲取當前滾動距離
    };

    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll); // 清除監聽
      window.removeEventListener("resize", handleResize); // 清除監聽
    };
  }, []);

  const backgroundOpacity = Math.min(scrollPosition / 200, 1);

  const handleSearchClick = () => {
    setIsSearchActive(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // 聚焦到輸入框
      }
    }, 0);
  };

  const handleBlur = () => {
    setIsSearchActive(false);
  };

  return (
    <nav className={styles.navbar}
         style={{
           backgroundColor: isLightMode ? `rgba(255, 255, 255, ${backgroundOpacity})` : `rgba(0, 0, 0, ${backgroundOpacity})`
         }}
    >
      <div className={styles.left_side}>
        <div className={styles.navbar_logo}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"/>
        </div>

        <div className={classNames({
          [styles.navbar_links]: true,
          [styles.light]: isLightMode,
        })}>
          {screenWidth > 1024
            ? <>
              <a href="/">首頁</a>
              <a href="/shows">節目</a>
              <a href="/movies">電影</a>
            </>
            : <a className={styles.dropdown_container}>
                <div className={styles.browse}
                     onClick={toggleDropdown}
                >
                  瀏覽
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.178 19.569C11.2697 19.7022 11.3925 19.8112 11.5357 19.8864C11.6789 19.9617 11.8382 20.001 12 20.001C12.1618 20.001 12.3211 19.9617 12.4643 19.8864C12.6075 19.8112 12.7303 19.7022 12.822 19.569L21.822 6.569C21.9262 6.41906 21.9873 6.24343 21.9986 6.06121C22.01 5.87898 21.9712 5.69712 21.8865 5.53539C21.8018 5.37366 21.6743 5.23825 21.518 5.14386C21.3617 5.04947 21.1826 4.99971 21 5H3C2.81784 5.00075 2.63934 5.05115 2.48368 5.14576C2.32802 5.24038 2.2011 5.37564 2.11657 5.53699C2.03203 5.69835 1.99308 5.8797 2.00391 6.06153C2.01473 6.24337 2.07492 6.41881 2.178 6.569L11.178 19.569Z"
                      fill="white"
                    />
                  </svg>
                </div>
              <div className={
                classNames({
                  [styles.dropdown_menu]: true,
                  [styles.open]: isOpen,
                })
              }>
                <div className={styles.dropdown_arrow}></div>
                <div className={styles.dropdown_header}></div>
                <div className={styles.menu_item}>主页</div>
                <div className={styles.menu_item}>节目</div>
                <div className={styles.menu_item}>电影</div>
              </div>
            </a>
          }
        </div>
      </div>
      <div className={classNames({
        [styles.navbar_icons]: true,
        [styles.active]: isSearchActive
      })}>
        <div
          className={classNames({
            [styles.search_container]: true,
            [styles.active]: isSearchActive,
            [styles.light]: isLightMode,
          })}
          onClick={handleSearchClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
              fill="white"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="片名、人員、類型"
            className={
            classNames({
              [styles.search_input]: true,
              [styles.light]: isLightMode
            })
          }
            onBlur={handleBlur}
            onChange={onChange}
          />
        </div>
        <button onClick={() => handleChangeMode(true)}>
          light
        </button>
      </div>
    </nav>
  )
}