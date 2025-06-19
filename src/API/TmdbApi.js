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

export const getContentByGenre = async (type, genreId) => {
    const result = await axiosInstance.get(`/discover/${type}?with_genres=${genreId}`)
    return result
}

