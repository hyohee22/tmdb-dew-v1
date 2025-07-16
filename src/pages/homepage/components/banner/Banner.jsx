import React, { useState } from 'react';
import { usePopularMoviesQuery } from '../../../../hook/usePopularMovies';
import { useMovieTrailer } from '../../../../hook/useMovieTrailer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { findAllByAltText } from '@testing-library/dom';

const Banner = () => {
  /* 모달 열고 닫기 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 인기 영화 정보 가져오기
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const movie = data?.data?.results?.[0];
  const movieId = movie?.id;

  // 영화 예고편 정보
  const { data: trailerData } = useMovieTrailer(movieId, {
    enabled: !!movieId
  });

  
  console.log('🎬 트레일러:', trailerData);
  
  if (isLoading) return <h2>로딩중</h2>;
  if (isError) return <h2>{error.message}</h2>;
  const trailerKey =
  trailerData?.data?.results?.find(
    (video) => video.type === 'Trailer' && video.official === true
  );
  console.log(trailerKey)
  return (
    <div
      className='banner'
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`,
      }}
    >
      <div className='movie-info'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info-box">
          <h2 className='title'>{movie.title}</h2>
          <p className='release-date'>({movie.release_date})</p>
          <p>"{movie.overview}"</p>
          <span>장르 {movie.genre_ids?.join(', ')}</span>
          <p>관람연령 ({movie.adult ? '성인' : '전체관람가'})</p>
          <p>평점 ⭐ {Math.round(movie.vote_average)}</p>
          <Button className='movie-btn' onClick={handleShow}>
          Trailer
          </Button>
        </div>

        {/* 모달 */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{
            position : 'relative'
          }}>
            <Modal.Title>{movie.title} 예고편</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {trailerKey ? (
  <iframe
    src={`https://www.youtube.com/embed/${trailerKey.key}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%'
    }}
    title="movie trailer"
  ></iframe>)
          :(
            <p>예고편 없음</p>
          )}
          
        </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Banner;
