import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { usePopularMoviesQuery } from '../../../hook/usePopularMovies';
import MovieCard from '../movieCard/MovieCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>로딩중...</h1>; 
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel
      responsive={responsive}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      swipeable={true}
      emulateTouch={true}
    >
      {data.data.results.map((movie, index) => (
        <MovieCard movie={movie} key={index} />
      ))}
    </Carousel>
  );
};

export default PopularMovieSlide;
