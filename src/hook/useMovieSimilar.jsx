import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSimilarMovies = (movieId) => {
  return api.get(`/movie/${movieId}/similar?language=ko-KR&page=1`);
};

export const useMovieSimilar = (movieId) => {
  return useQuery({
    queryKey: ['similar-movies', movieId],
    queryFn: () => fetchSimilarMovies(movieId),
    enabled: !!movieId,
  });
};
