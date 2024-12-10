import {useRef, useState, useEffect} from 'react';
import styles from './Header.module.scss';
import classNames from "classnames";
import netphlix from '../../assets/netttphlix.png'
import {Link} from "react-router-dom";
import ApiService from "../../services/ApiService.js";

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

  async function search() {
    const data = await ApiService.search(inputValue)

    updateValue(data.results)
  }

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
    setIsRunning(false);
    setTimeLeft(1000); // 將倒數時間重置為初始值
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => ! prev);
  };

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
    <nav className={classNames({
      [styles.navbar]: true,
      [styles.light]: isLightMode,
    })}
         style={{
           backgroundColor: isLightMode
             ? `rgba(255, 255, 255, ${backgroundOpacity})`
             : `rgba(0, 0, 0, ${backgroundOpacity})`
         }}
    >
      <div className={styles.left_side}>
        <div className={styles.navbar_logo}>
          <img src={netphlix} alt="Netflix Logo"/>
        </div>

        <div className={classNames({
          [styles.navbar_links]: true,
          [styles.light]: isLightMode,
        })}>
          {screenWidth > 1024
            ? <>
              <div><Link to="/">Home</Link></div>
              <div><Link to="/">TV show</Link></div>
              <div><Link to="/">Movie</Link></div>
              <div><Link to="/about">About</Link></div>
            </>
            : <a className={styles.dropdown_container}>
                <div className={styles.browse}
                     onClick={toggleDropdown}
                >
                  Browse
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
                <div className={styles.menu_item}><Link to="/">Home</Link></div>
                <div className={styles.menu_item}><Link to="/">TV show</Link></div>
                <div className={styles.menu_item}><Link to="/">Movie</Link></div>
                <div className={styles.menu_item}><Link to="/about">About</Link></div>
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
            placeholder="Title, characters, genre"
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
        <div onClick={() => handleChangeMode()}>
          {
            isLightMode
              ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.523 22 22 17.523 22 12C22 11.537 21.306 11.46 21.067 11.857C20.5572 12.7013 19.862 13.4186 19.034 13.9545C18.206 14.4903 17.2669 14.8307 16.2878 14.9499C15.3088 15.0691 14.3154 14.9639 13.383 14.6423C12.4507 14.3207 11.6037 13.7911 10.9063 13.0937C10.2089 12.3963 9.67932 11.5493 9.35772 10.617C9.03613 9.68457 8.93093 8.69123 9.0501 7.71217C9.16926 6.73311 9.50967 5.794 10.0455 4.96599C10.5814 4.13797 11.2987 3.44275 12.143 2.933C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
                    fill="black"/>
                </svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12Z"
                    fill="white"/>
                  <path d="M12 1.25C12.1989 1.25 12.3897 1.32902 12.5303 1.46967C12.671 1.61032 12.75 1.80109 12.75 2V3C12.75 3.19891 12.671 3.38968 12.5303 3.53033C12.3897 3.67098 12.1989 3.75 12 3.75C11.8011 3.75 11.6103 3.67098 11.4697 3.53033C11.329 3.38968 11.25 3.19891 11.25 3V2C11.25 1.80109 11.329 1.61032 11.4697 1.46967C11.6103 1.32902 11.8011 1.25 12 1.25ZM4.399 4.399C4.53963 4.25855 4.73025 4.17966 4.929 4.17966C5.12775 4.17966 5.31837 4.25855 5.459 4.399L5.852 4.791C5.98869 4.93239 6.06437 5.1218 6.06276 5.31845C6.06114 5.5151 5.98235 5.70325 5.84336 5.84237C5.70437 5.98149 5.5163 6.06046 5.31965 6.06226C5.123 6.06406 4.93352 5.98855 4.792 5.852L4.399 5.459C4.25855 5.31837 4.17966 5.12775 4.17966 4.929C4.17966 4.73025 4.25855 4.53963 4.399 4.399ZM19.601 4.399C19.7415 4.53963 19.8203 4.73025 19.8203 4.929C19.8203 5.12775 19.7415 5.31837 19.601 5.459L19.208 5.852C19.0658 5.98448 18.8778 6.0566 18.6835 6.05317C18.4892 6.04975 18.3038 5.97103 18.1664 5.83362C18.029 5.69621 17.9503 5.51082 17.9468 5.31652C17.9434 5.12222 18.0155 4.93417 18.148 4.792L18.541 4.399C18.6816 4.25855 18.8722 4.17966 19.071 4.17966C19.2697 4.17966 19.4604 4.25855 19.601 4.399ZM1.25 12C1.25 11.8011 1.32902 11.6103 1.46967 11.4697C1.61032 11.329 1.80109 11.25 2 11.25H3C3.19891 11.25 3.38968 11.329 3.53033 11.4697C3.67098 11.6103 3.75 11.8011 3.75 12C3.75 12.1989 3.67098 12.3897 3.53033 12.5303C3.38968 12.671 3.19891 12.75 3 12.75H2C1.80109 12.75 1.61032 12.671 1.46967 12.5303C1.32902 12.3897 1.25 12.1989 1.25 12ZM20.25 12C20.25 11.8011 20.329 11.6103 20.4697 11.4697C20.6103 11.329 20.8011 11.25 21 11.25H22C22.1989 11.25 22.3897 11.329 22.5303 11.4697C22.671 11.6103 22.75 11.8011 22.75 12C22.75 12.1989 22.671 12.3897 22.5303 12.5303C22.3897 12.671 22.1989 12.75 22 12.75H21C20.8011 12.75 20.6103 12.671 20.4697 12.5303C20.329 12.3897 20.25 12.1989 20.25 12ZM18.148 18.148C18.2886 18.0076 18.4792 17.9287 18.678 17.9287C18.8768 17.9287 19.0674 18.0076 19.208 18.148L19.601 18.541C19.6747 18.6097 19.7338 18.6925 19.7748 18.7845C19.8158 18.8765 19.8378 18.9758 19.8396 19.0765C19.8414 19.1772 19.8228 19.2772 19.7851 19.3706C19.7474 19.464 19.6913 19.5488 19.62 19.62C19.5488 19.6913 19.464 19.7474 19.3706 19.7851C19.2772 19.8228 19.1772 19.8414 19.0765 19.8396C18.9758 19.8378 18.8765 19.8158 18.7845 19.7748C18.6925 19.7338 18.6097 19.6747 18.541 19.601L18.148 19.208C18.0076 19.0674 17.9287 18.8768 17.9287 18.678C17.9287 18.4792 18.0076 18.2886 18.148 18.148ZM5.852 18.148C5.99245 18.2886 6.07134 18.4792 6.07134 18.678C6.07134 18.8768 5.99245 19.0674 5.852 19.208L5.459 19.601C5.39034 19.6747 5.30754 19.7338 5.21554 19.7748C5.12354 19.8158 5.02423 19.8378 4.92352 19.8396C4.82282 19.8414 4.72279 19.8228 4.6294 19.7851C4.53601 19.7474 4.45118 19.6913 4.37996 19.62C4.30874 19.5488 4.2526 19.464 4.21488 19.3706C4.17716 19.2772 4.15863 19.1772 4.16041 19.0765C4.16219 18.9758 4.18423 18.8765 4.22522 18.7845C4.26621 18.6925 4.32531 18.6097 4.399 18.541L4.791 18.148C4.86065 18.0783 4.94335 18.023 5.03438 17.9853C5.1254 17.9476 5.22297 17.9282 5.3215 17.9282C5.42003 17.9282 5.5176 17.9476 5.60862 17.9853C5.69965 18.023 5.78235 18.0783 5.852 18.148ZM12 20.25C12.1989 20.25 12.3897 20.329 12.5303 20.4697C12.671 20.6103 12.75 20.8011 12.75 21V22C12.75 22.1989 12.671 22.3897 12.5303 22.5303C12.3897 22.671 12.1989 22.75 12 22.75C11.8011 22.75 11.6103 22.671 11.4697 22.5303C11.329 22.3897 11.25 22.1989 11.25 22V21C11.25 20.8011 11.329 20.6103 11.4697 20.4697C11.6103 20.329 11.8011 20.25 12 20.25Z"
                        fill="white"/>
                </svg>
          }
        </div>
      </div>
    </nav>
  )
}