import React from 'react';
import Banner from './components/banner/Banner';
import PopularMovieSlide from './PopularMovieSlide/PopularMovieSlide';
import NowPlayingMovieSlide from './NowPlayingMovieSlide/NowPlayingMovieSlide';
import TopRatedMovieSlide from './TopRatedMovieSlide/TopRatedMovieSlide';
import UpcomingMovieSlide from './UpcomingMovieSlide/UpcomingMovieSlide';

const HomePage = () => {
  const movieSections = [
    {
      id: 'popular',
      title: "인기 영화",
      description: "인기 영화를 소개합니다",
      component: <PopularMovieSlide />
    },
    {
      id: 'nowPlaying',
      title: "현재 상영중인 영화",
      description: "현재 상영중인 영화를 소개합니다",
      component: <NowPlayingMovieSlide />
    },
    {
      id: 'topRated',
      title: "평점 높은 영화",
      description: "높은 평점을 받은 영화를 소개합니다",
      component: <TopRatedMovieSlide />
    },
    {
      id: 'upcoming',
      title: "상영 예정 영화",
      description: "상영 예정인 영화를 소개합니다",
      component: <UpcomingMovieSlide />
    }
  ];

  return (
    <div className='home-pages'>
      <Banner />
      {movieSections.map((section) => (
        <div key={section.id} className="movie-section">
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.component}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
