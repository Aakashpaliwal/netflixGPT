import axiosInstance from "@/API/interceptor"
import axios from "axios"

const BASE_URL = 'https://api.themoviedb.org/3'
const AUTH_TOKEN = import.meta.env.VITE_TMDB_AUTH_KEY

export const getTrendMovie = async () => {
    const result = await axiosInstance.get('/trending/movie/week?language=en-US')
    return result
}

export const getTrendShows = async() => {
    const result = await axiosInstance.get('/trending/tv/day?language=en-US')
    return result
}

export const getPopularMovies = async () => {
    const result = await axiosInstance.get('/movie/popular?language=en-US&page=1')
    return result
}

export const getTopRatedMovies = async () => {
    const result = await axiosInstance.get('/movie/top_rated?language=en-US&page=1')
    return result
}

export const getNowPlayingMovies = async () => {
    const result = await axiosInstance.get('/movie/now_playing?language=en-US&page=1')
    return result
}

export const getUpcomingMovies = async () => {
    const result = await axiosInstance.get('/movie/upcoming?language=en-US&page=1')
    return result
}

export const getGenres = async () => {
    const result = await axiosInstance.get('/genre/movie/list')
    return result
}

export const getTvGenres = async () => {
    const result = await axiosInstance.get('/genre/tv/list')
    return result
}

export const getContentByGenre = async (type, genreId, pageParam) => {
    const result = await axiosInstance.get(`/discover/${type}?with_genres=${genreId}&page=${pageParam}`)
    return result
}

export const getTredningTvshows = async () => {
    const result = await  axiosInstance.get('/trending/tv/day?language=en-US')
    return result
}

export const getAiringTodayTvshows = async () => {
    const result = await  axiosInstance.get('/tv/airing_today?language=en-US&page=1')
    return result
}

export const getonTheAirTvshows = async () => {
    const result = await  axiosInstance.get('/tv/on_the_air?language=en-US&page=1')
    return result
}

export const getPopularTvshows = async () => {
    const result = await  axiosInstance.get('/tv/popular?language=en-US&page=1')
    return result
}

export const getTopRatedTvshows = async () => {
    const result = await  axiosInstance.get('/tv/top_rated?language=en-US&page=1')
    return result
}

export const getMovieVideo = async (id) => {
    const result = await axiosInstance.get(`/movie/${id}/videos?language=en-US`)
    return result
}

export const getSearchedContent = async (searchTerm) => {
    const result = await axiosInstance.get(`/search/multi?query=${searchTerm}&language=en-US&page=1`)
    return result
}

export const getContentDetails = async(type, id) => {
    const result = await axiosInstance.get(`/${type}/${id}?language=en-US`)
    return result
}