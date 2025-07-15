import React, {useEffect} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { usePopularMoviesQuery } from '../../hook/usePopularMovies'
import { useSearchMovieQuery } from '../../hook/useSearchMovieQuery'

const MoviePage = () => {
  //1. 인기영화 데이터 가져오기
  const {data: popularData, isLoading, isError, error} = usePopularMoviesQuery();
  //2. url에서 파라미터가ㅣㅄ  가져오기
  const [query] = useSearchParams();
  const keyword = query.get('keyword');
  //3. 검색 키워드가 있으면 검색 api실행
  const {data : searchData} = useSearchMovieQuery(keyword);
  //4. 컴포넌트 렌더링 되면  인기영화 보여주기
  useEffect(()=>{
    if(popularData){
      console.log('무비페이지에서 인기영화 확인', popularData);
    }
  })
  //5. 경고창에 띄워주기
  useEffect(()=>{
    if(keyword){
      alert(`제발${keyword}`)
      console.log('확인확인', searchData)
    }
  })

  return (
    <div>MoviePage</div>
  )
}

export default MoviePage