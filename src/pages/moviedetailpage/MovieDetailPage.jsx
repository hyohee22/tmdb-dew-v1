import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
/* spinners */
import { BarLoader } from 'react-spinners';
/* hook */
import { useMovieDetail } from '../../hook/useMovieDetail';
import { useMovieReviews } from '../../hook/useMovieReviews';
import { useGenreList } from '../../hook/useGenreList';
import { useMovieTrailer } from '../../hook/useMovieTrailer';
import { useMovieCredits } from '../../hook/useMovieCredits';
import { useMovieSimilar } from '../../hook/useMovieSimilar';
/* react-bootstrap */
import { Container, Row, Col, Badge, Button, Alert, Modal } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
/* bootstrap-icons */
import 'bootstrap-icons/font/bootstrap-icons.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};


const MovieDetailPage = () => {
  /* 파라미터값에서 아이디 가져오기, 함수명 아래에 해줘야 오류가 뜨지않음 */
  const { id } = useParams();
  /* 크레딧 가져오기 */
  const { data: creditsData } = useMovieCredits(id);
  console.log('크레딧 확인', creditsData)
  console.log('cast는 뭔가요?', creditsData?.cast);
  console.log('cast는 뭔가요?', creditsData?.data?.cast);
  /* 리뷰 가져오기 */
  const { data: reviewsData } = useMovieReviews(id);
  console.log('리뷰', reviewsData);
  /* 추천영화 가져오기 */
  const { data: similarData, isLoading: simLoading } = useMovieSimilar(id);
  /* 예고편 가져오기 */
  const { data: trailerData } = useMovieTrailer(id)
  /* 모달 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const trailer = trailerData?.data?.results?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );


  console.log('트레일러 확인', trailerData)
  const { data, isLoading, isError, error } = useMovieDetail(id);
  if (isLoading) return <h2><BarLoader className='loader' /></h2>
  if (isError) return <h2> {error.message}</h2>

  const movie = data?.data;
  return (
    <div>
      {/* 상단 */}
      <div className='movie-detail-back'
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1280${movie.backdrop_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <Row className='align-items-center'>
            {/* 이미지 왼쪽 포스터 영역 */}
            <Col sm={3}>
              <img src={`https://media.themoviedb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
                className='img-fluid rounded shadow movie-detail-poster'
              />
            </Col>
            {/* 오른쪽 영화 정보 */}
            <Col sm={9}>
              <h2>{movie.title}</h2>
              <p>({movie.release_date})</p>
              <p>"{movie.overview}"</p>
              <p>
                {movie.adult ? (
                  <span>성인관람</span>
                ) : (
                  <span><i class="bi bi-shield-check"></i>전체관람</span>
                )}
                {/* 언어 */}
                <span className="mb-2 language">
                  {movie.original_language?.toUpperCase()}
                </span>
                {/* 국가 */}
                <div className='mb-2'>
                  <strong><i class="bi bi-globe-asia-australia"></i>
                    {movie.production_countries?.map((c) => c.name).join(',')}
                  </strong>
                </div>
              </p>
              <div className='mb-2'>
                <strong>⭐</strong>
                <Badge>
                  {movie.vote_average.toFixed(1)}
                </Badge>
              </div>
              {/* 장르 */}
              <div className='mb-2'>
                <strong>
                  {movie.genres.map((genre) => (
                    <Badge variant="warning">{genre.name}</Badge>
                  ))}
                </strong>
              </div>
              {trailer ? (
                <Button className='trailer-btn' onClick={handleShow}>예고편 보기  <i class="bi bi-play-circle"></i></Button>
              ) : (
                <p className='trailer-btn'>예고편 없음</p>
              )}
            </Col>
          </Row>
          <Col></Col>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>{movie.title}</Modal.Header>
          <Modal.Body>
            {trailer ? <div className='ratio ratio-16x9'>
              <iframe src={'https://www.youtube.com/embed/{}'}></iframe>
            </div>
              :
              <p>예고편 없음</p>
            }

          </Modal.Body>
        </Modal>
      </div>

      {/* 출연배우 */}
      <Container className='title'>
        <h2 className='title'>출연배우</h2>
        <p>{movie.title}dp 출연한 배우들을 소개합니다. </p>
      </Container>

      {Array.isArray(creditsData?.data?.cast) && creditsData.data.cast.length > 0 ? (
        <Carousel className='cast-carousel'
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          arrows={true}
        >
          {creditsData.data.cast.map((actor, index) => (
            <div key={index} className="actor-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : ""
                }
                alt={actor.name}
                className="actor-img"
              />
              <h5>{actor.name}</h5>
              <p>({actor.character})</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>배우 정보가 없습니다 🥲</p>
      )}
      {/* 리뷰 */}
      <Container className='title'>
        <h2 className='title'>Review</h2>
        <p>영화 감상평을 확인해보세요. </p>
      </Container>
      {reviewsData?.data?.results?.length > 0 && (
        <div className='movie-review'>
          <Container className='m-5 '>
            {reviewsData.data.results.map((review) => (
              <Row key={review.id} className="mb-4 align-items-start">
                <Col md={1} className='review-img-wrap'>
                  <div className='review-img'>
                    {review.author_details?.avatar_path ? (
                      <img
                        src={`https://media.themoviedb.org/t/p/w45_and_h45_face/${review.author_details.avatar_path}`}
                        alt={review.author}
                      />
                    ) : (
                      <img
                        src="https://i.namu.wiki/i/nChyxZrmDreSPHgpSGhUEY5DgjO9gh7PKCEJLU-UhXaFvnDWfvcqZyUZC7WVuzAcSzczCFMoXclQCRXju1v-NA.webp"
                        alt="기본 프로필" className='avata'
                      />
                    )}
                  </div>
                </Col>
                <Col>
                  <h6>작성자 : {review.author}</h6>
                  <p>{review.content.length > 200 ? review.content.slice(0, 200) + "..." : review.content}</p>
                  <p>{review.created_at.slice(0, 10)}</p>
                </Col>
              </Row>
            ))}
          </Container>
        </div>
      )}


      {/* 추천영화 */}
      <Container className='title'>
        <h2 className='title'>추천영화</h2>
        <p>비슷한 영화를 확인해보세요.</p>
      </Container>

      {simLoading ? (
        <p>추천 영화 불러오는 중...</p>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          arrows={true}
          className='similar-carousel'
        >
          {similarData?.data?.results?.slice(0, 10).map((movie) => (
            <div key={movie.id} className="text-center px-2">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h6 className='mt-2'>{movie.title}</h6>
            </div>
          ))}
        </Carousel>
      )}
</div>
  )
}


      export default MovieDetailPage