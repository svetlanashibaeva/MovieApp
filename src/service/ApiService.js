export default class ApiService {
    constructor() {
        this._apiBase = 'https://api.themoviedb.org/';
    }

    fetchData = async (path, params) => {
        let url = new URL(`${this._apiBase}${path}`);
        params['api_key'] = '8477f03bc569ce2a7688ae7c56e24465'
        params['language'] = 'ru-RU'
        url.search = new URLSearchParams(params).toString(); 
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
              `, received ${res.status}`);
          }
        return await res.json();
    }

    fetchMovies = async (params) => {
        const res = await this.fetchData('3/discover/movie', params);
        return res
    }

    searchMovies = async (params) => {
        const res = await this.fetchData('3/search/movie', params);
        return res
    }

    showMovieInfo = async (id) => {
        const res = await this.fetchData(`/3/movie/${id}`,{});
        return res
    }
}
