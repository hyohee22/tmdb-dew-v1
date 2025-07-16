import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePopularMoviesQuery } from '../../hook/usePopularMovies';
import { useSearchMovieQuery } from '../../hook/useSearchMovieQuery';

const MoviePage = () => {
  // 1. 인기 영화 데이터 가져오기
  const { data: popularData, isLoading, isError, error } = usePopularMoviesQuery();

  // 2. URL에서 keyword 파라미터 가져오기
  const [query] = useSearchParams();
  const keyword = query.get('keyword');

  // 3. keyword가 있을 경우 검색 API 실행
  const { data: searchData } = useSearchMovieQuery(keyword);

  // 4. 인기영화 콘솔 출력 (데이터 들어왔을 때만!)
  useEffect(() => {
    if (popularData) {
      console.log('🎬 무비페이지에서 인기영화 확인:', popularData);
    }
  }, [popularData]);

  // 5. 검색 키워드 있을 때만 알림창
  useEffect(() => {
    if (keyword) {
      alert(`🔍 검색어: ${keyword}`);
      console.log('🔍 검색 결과:', searchData);
    }
  }, [keyword, searchData]);

  // 6. 로딩/에러 처리
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h2>Movie Page</h2>
      {keyword ? (
        <p>“{keyword}”에 대한 검색 결과가 있습니다.</p>
      ) : (
        <p>현재 인기 있는 영화를 확인해보세요!</p>
      )}
      {/* 영화 리스트는 나중에 여기에 map으로 추가하면 됨 */}
    </div>
  );
};

export default MoviePage;
