import axiosInstance from "@/API/interceptor"
import axios from "axios"

const BASE_URL = 'https://api.themoviedb.org/3'
const AUTH_TOKEN = import.meta.env.VITE_TMDB_AUTH_KEY

export const getTrendMovie = async () => {
    const result = await axiosInstance.get('/trending/movie/day?language=en-US')
    return result
}