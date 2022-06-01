import axios from "axios";

// export const baseURL = 'https://dry-forest-56016.herokuapp.com/';

enum BASE_URLS {
    LOCAL = 'http://localhost:7542/2.0/',
    HEROKU = ''
}

export const instance = axios.create({
    baseURL: BASE_URLS.LOCAL,
    withCredentials: true,
});