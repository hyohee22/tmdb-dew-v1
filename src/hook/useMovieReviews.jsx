import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieReviews = (movieID) => {
  return api.get(`/movie/${movieID}/reviews`);
};

export const useMovieReviews = (movieID) => {
  return useQuery({
    queryKey: ['movie-reviews', movieID],
    queryFn: () => fetchMovieReviews(movieID),
  });
};

