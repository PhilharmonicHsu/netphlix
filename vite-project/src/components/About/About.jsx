import styles from "./About.module.scss";
import teamImg from "../../assets/team.png";
import classNames from "classnames";

export default function About({isLightMode}) {
  return <div className={classNames({
    [styles.about_page]: true,
    [styles.light]: isLightMode
  })}>
    <section className={styles.hero_section}>
      <div className={styles.hero_background}>
        <h1>Nettphlix</h1>
        <p>Your gateway to the world of movies.</p>
      </div>
    </section>

    <section className={classNames({
      [styles.features_section]: true,
      [styles.light]: isLightMode
    })}>
      <h2>What We Offer</h2>
      <div className={styles.features_grid}>
        <div className={classNames({
          [styles.feature_card]: true,
          [styles.light]: isLightMode
        })}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                  d="M12 20.8C14.3339 20.8 16.5722 19.8729 18.2225 18.2225C19.8729 16.5722 20.8 14.3339 20.8 12C20.8 9.66609 19.8729 7.42778 18.2225 5.77746C16.5722 4.12714 14.3339 3.2 12 3.2C9.66609 3.2 7.42778 4.12714 5.77746 5.77746C4.12714 7.42778 3.2 9.66609 3.2 12C3.2 14.3339 4.12714 16.5722 5.77746 18.2225C7.42778 19.8729 9.66609 20.8 12 20.8ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.123 11.123L9.267 14.733L12.877 12.877L14.733 9.267L11.123 11.123ZM10.233 10.233L16.124 7.203C16.2182 7.15438 16.3254 7.13694 16.4301 7.1532C16.5348 7.16946 16.6317 7.21858 16.7067 7.29346C16.7817 7.36835 16.8309 7.46513 16.8473 7.56984C16.8638 7.67454 16.8465 7.78175 16.798 7.876L13.768 13.768L7.876 16.798C7.78173 16.8469 7.67435 16.8644 7.56941 16.8482C7.46448 16.8319 7.36745 16.7827 7.29236 16.7076C7.21728 16.6326 7.16805 16.5355 7.1518 16.4306C7.13556 16.3257 7.15314 16.2183 7.202 16.124L10.232 10.232L10.233 10.233Z"
                  fill="white"/>
          </svg>

          <h3>Discover Movies</h3>
          <p>Explore a vast library of movies and TV shows.</p>
        </div>
        <div className={classNames({
          [styles.feature_card]: true,
          [styles.light]: isLightMode
        })}>
          <svg width="50" height="50" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 2C2.36739 2 2.24021 2.05268 2.14645 2.14645C2.05268 2.24021 2 2.36739 2 2.5V13.5C2 13.6326 2.05268 13.7598 2.14645 13.8536C2.24021 13.9473 2.36739 14 2.5 14H13.5C13.6326 14 13.7598 13.9473 13.8536 13.8536C13.9473 13.7598 14 13.6326 14 13.5V2.5C14 2.36739 13.9473 2.24021 13.8536 2.14645C13.7598 2.05268 13.6326 2 13.5 2H2.5ZM4 6H10V5H4V6ZM11 6H12V5H11V6ZM10 8.5H4V7.5H10V8.5ZM11 8.5H12V7.5H11V8.5ZM10 11H4V10H10V11ZM11 11H12V10H11V11Z"
              fill="white"/>
          </svg>
          <h3>Personalized Watchlist</h3>
          <p>Save your favorites and manage your watchlist.</p>
        </div>
        <div className={classNames({
          [styles.feature_card]: true,
          [styles.light]: isLightMode
        })}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 20.077V3H21V17H6.077L3 20.077ZM9.517 13.673L12 12.167L14.483 13.673L13.823 10.848L16.019 8.964L13.133 8.708L12 6.058L10.867 8.708L7.981 8.964L10.177 10.848L9.517 13.673Z"
              fill="white"/>
          </svg>

          <h3>Read & Write Reviews</h3>
          <p>Share your thoughts with a vibrant community.</p>
        </div>
      </div>
    </section>

    <section className={classNames({
      [styles.stats_section]: true,
      [styles.light]: isLightMode
    })}>
      <div className={styles.stats}>
        <div className={classNames({
          [styles.stat_item]: true,
          [styles.light]: isLightMode
        })}><strong>10,000+</strong> Movies and TV Shows</div>
        <div className={classNames({
          [styles.stat_item]: true,
          [styles.light]: isLightMode
        })}><strong>50,000+</strong> Active Users
        </div>
        <div className={classNames({
          [styles.stat_item]: true,
          [styles.light]: isLightMode
        })}><strong>24/7</strong> Real-Time Updates
        </div>
      </div>
    </section>

    <section className={classNames({
      [styles.tech_section]: true,
      [styles.light]: isLightMode
    })}>
      <h2>Powered by Technology</h2>
      <p>Our platform is supported by the TMDB API, delivering real-time and reliable data.</p>
    </section>

    <section className={classNames({
      [styles.team_section]: true,
      [styles.light]: isLightMode
    })}>
      <h2>Meet Our Team</h2>
      <div className={styles.team_grid}>
        <div className={classNames({
          [styles.team_member]: true,
          [styles.light]: isLightMode
        })}>
          <img src={teamImg} alt="Team Member" />
            <h3>Phil</h3>
            <p>Founder & CEO</p>
        </div>
      </div>
    </section>

    <section className={classNames({
      [styles.contact_section]: true,
      [styles.light]: isLightMode
    })}>
      <h2>Stay Connected</h2>
      <div className={classNames({
        [styles.contact_info]: true,
        [styles.light]: isLightMode
      })}>
        <p>Email: support@movienettphlix.com</p>
        <div className={styles.social_links}>
          <a href="#">
            <svg width="50" height="50" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_86_11)">
                <path
                  d="M14.5813 0.60376H1.42001C0.969207 0.60376 0.60376 0.969207 0.60376 1.42001V14.5813C0.60376 15.0321 0.969207 15.3975 1.42001 15.3975H14.5813C15.0321 15.3975 15.3975 15.0321 15.3975 14.5813V1.42001C15.3975 0.969207 15.0321 0.60376 14.5813 0.60376Z"
                  fill="#3D5A98"/>
                <path
                  d="M10.81 15.3962V9.66749H12.7325L13.02 7.43499H10.81V6.00999C10.81 5.36374 10.99 4.92249 11.9163 4.92249H13.0988V2.92249C12.5261 2.86292 11.9507 2.83454 11.375 2.83749C9.67251 2.83749 8.50001 3.87499 8.50001 5.78874V7.43499H6.57751V9.66749H8.50001V15.3962H10.81Z"
                  fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_86_11">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="#">
            <svg width="50" height="50" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_86_14)">
                <path
                  d="M12.25 0H3.75C1.67893 0 0 1.67893 0 3.75V12.25C0 14.3211 1.67893 16 3.75 16H12.25C14.3211 16 16 14.3211 16 12.25V3.75C16 1.67893 14.3211 0 12.25 0Z"
                  fill="white"/>
                <path
                  d="M12.25 0H3.75C1.67893 0 0 1.67893 0 3.75V12.25C0 14.3211 1.67893 16 3.75 16H12.25C14.3211 16 16 14.3211 16 12.25V3.75C16 1.67893 14.3211 0 12.25 0Z"
                  fill="#1D9BF0"/>
                <path
                  d="M12.4733 5.71318C12.4801 5.81237 12.4801 5.91156 12.4801 6.01168C12.4801 9.0615 10.1584 12.5789 5.91294 12.5789V12.577C4.65876 12.5788 3.43056 12.2196 2.375 11.5423C2.55746 11.5642 2.74058 11.5753 2.92438 11.5756C3.96388 11.5765 4.97348 11.2278 5.79094 10.5857C5.30931 10.5766 4.84257 10.4172 4.45596 10.1298C4.06935 9.84242 3.78219 9.44143 3.63462 8.98287C3.98042 9.04957 4.33692 9.03597 4.67662 8.94312C3.59987 8.72556 2.82519 7.7795 2.82519 6.68075V6.6515C3.14618 6.8303 3.50542 6.92937 3.87269 6.94037C2.85856 6.26256 2.54594 4.91337 3.15831 3.8585C3.73773 4.5716 4.4607 5.15482 5.28024 5.57026C6.09979 5.9857 6.99757 6.22407 7.91525 6.26987C7.82375 5.87602 7.83727 5.46505 7.95444 5.07806C8.07161 4.69107 8.28834 4.34163 8.58294 4.06468C9.51256 3.19081 10.9746 3.23562 11.8485 4.16475C12.3654 4.0627 12.8611 3.87321 13.3142 3.60443C13.1419 4.13885 12.7813 4.59248 12.2996 4.88093C12.7571 4.82698 13.2039 4.7045 13.625 4.51762C13.3153 4.98152 12.9252 5.38634 12.4733 5.71318Z"
                  fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_86_14">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="#">
            <svg width="50" height="50" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_86_19)">
                <path
                  d="M12.25 0H3.75C1.67893 0 0 1.67893 0 3.75V12.25C0 14.3211 1.67893 16 3.75 16H12.25C14.3211 16 16 14.3211 16 12.25V3.75C16 1.67893 14.3211 0 12.25 0Z"
                  fill="url(#paint0_radial_86_19)"/>
                <path
                  d="M12.25 0H3.75C1.67893 0 0 1.67893 0 3.75V12.25C0 14.3211 1.67893 16 3.75 16H12.25C14.3211 16 16 14.3211 16 12.25V3.75C16 1.67893 14.3211 0 12.25 0Z"
                  fill="url(#paint1_radial_86_19)"/>
                <path
                  d="M8.00056 1.75C6.30319 1.75 6.09013 1.75744 5.4235 1.78775C4.75813 1.81825 4.30394 1.92356 3.90656 2.07812C3.49544 2.23775 3.14675 2.45131 2.79938 2.79881C2.45169 3.14625 2.23813 3.49494 2.078 3.90587C1.923 4.30337 1.81756 4.75775 1.78762 5.42281C1.75781 6.0895 1.75 6.30263 1.75 8.00006C1.75 9.6975 1.7575 9.90987 1.78775 10.5765C1.81838 11.2419 1.92369 11.6961 2.07812 12.0934C2.23787 12.5046 2.45144 12.8533 2.79894 13.2006C3.14625 13.5483 3.49494 13.7624 3.90575 13.922C4.30344 14.0766 4.75769 14.1819 5.42294 14.2124C6.08962 14.2427 6.3025 14.2501 7.99981 14.2501C9.69738 14.2501 9.90975 14.2427 10.5764 14.2124C11.2418 14.1819 11.6964 14.0766 12.0941 13.922C12.5051 13.7624 12.8532 13.5483 13.2005 13.2006C13.5482 12.8533 13.7617 12.5046 13.9219 12.0936C14.0755 11.6961 14.181 11.2417 14.2122 10.5766C14.2422 9.91 14.25 9.6975 14.25 8.00006C14.25 6.30263 14.2422 6.08962 14.2122 5.42294C14.181 4.75756 14.0755 4.30344 13.9219 3.90606C13.7617 3.49494 13.5482 3.14625 13.2005 2.79881C12.8529 2.45119 12.5052 2.23762 12.0938 2.07819C11.6953 1.92356 11.2409 1.81819 10.5755 1.78775C9.90881 1.75744 9.69656 1.75 7.99862 1.75H8.00056ZM7.43988 2.87631C7.60631 2.87606 7.792 2.87631 8.00056 2.87631C9.66938 2.87631 9.86712 2.88231 10.5261 2.91225C11.1355 2.94013 11.4663 3.04194 11.6866 3.1275C11.9783 3.24075 12.1862 3.37619 12.4048 3.595C12.6236 3.81375 12.7589 4.02206 12.8725 4.31375C12.9581 4.53375 13.06 4.8645 13.0878 5.47388C13.1177 6.13275 13.1242 6.33062 13.1242 7.99862C13.1242 9.66662 13.1177 9.86456 13.0878 10.5234C13.0599 11.1327 12.9581 11.4635 12.8725 11.6836C12.7593 11.9752 12.6236 12.1829 12.4048 12.4016C12.1861 12.6203 11.9784 12.7557 11.6866 12.869C11.4665 12.9549 11.1355 13.0565 10.5261 13.0844C9.86725 13.1143 9.66938 13.1208 8.00056 13.1208C6.33169 13.1208 6.13387 13.1143 5.47506 13.0844C4.86569 13.0563 4.53494 12.9544 4.31444 12.8689C4.02281 12.7556 3.81444 12.6202 3.59569 12.4014C3.37694 12.1827 3.24156 11.9749 3.128 11.6831C3.04244 11.463 2.9405 11.1322 2.91275 10.5229C2.88281 9.864 2.87681 9.66613 2.87681 7.99706C2.87681 6.328 2.88281 6.13119 2.91275 5.47231C2.94063 4.86294 3.04244 4.53219 3.128 4.31187C3.24131 4.02019 3.37694 3.81188 3.59575 3.59313C3.81456 3.37438 4.02281 3.23894 4.3145 3.12544C4.53481 3.0395 4.86569 2.93794 5.47506 2.90994C6.05162 2.88387 6.27506 2.87606 7.43988 2.87475V2.87631ZM11.3368 3.91406C10.9228 3.91406 10.5868 4.24969 10.5868 4.66381C10.5868 5.07788 10.9228 5.41381 11.3368 5.41381C11.7509 5.41381 12.0868 5.07788 12.0868 4.66381C12.0868 4.24975 11.7509 3.91381 11.3368 3.91381V3.91406ZM8.00056 4.79038C6.22806 4.79038 4.79094 6.2275 4.79094 8.00006C4.79094 9.77263 6.22806 11.2091 8.00056 11.2091C9.77313 11.2091 11.2098 9.77263 11.2098 8.00006C11.2098 6.22756 9.773 4.79038 8.00044 4.79038H8.00056ZM8.00056 5.91669C9.15113 5.91669 10.0839 6.84938 10.0839 8.00006C10.0839 9.15063 9.15113 10.0834 8.00056 10.0834C6.85 10.0834 5.91725 9.15063 5.91725 8.00006C5.91725 6.84938 6.84994 5.91669 8.00056 5.91669Z"
                  fill="white"/>
              </g>
              <defs>
                <radialGradient id="paint0_radial_86_19" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(4.25 17.2323) rotate(-90) scale(15.8572 14.7484)">
                  <stop stop-color="#FFDD55"/>
                  <stop offset="0.1" stop-color="#FFDD55"/>
                  <stop offset="0.5" stop-color="#FF543E"/>
                  <stop offset="1" stop-color="#C837AB"/>
                </radialGradient>
                <radialGradient id="paint1_radial_86_19" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(-2.68006 1.15256) rotate(78.681) scale(7.08825 29.218)">
                  <stop stop-color="#3771C8"/>
                  <stop offset="0.128" stop-color="#3771C8"/>
                  <stop offset="1" stop-color="#6600FF" stop-opacity="0"/>
                </radialGradient>
                <clipPath id="clip0_86_19">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>

          </a>
        </div>
      </div>
    </section>
  </div>

}