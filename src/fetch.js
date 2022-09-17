import axios from 'axios';
// const axios = require('axios').default;

// import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29950518-736902d68f4527d7af6cdbde5';

export const fetchCurrentPhoto = (namePhoto, pageCount) => {
  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${namePhoto}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageCount}&per_page=40`
  );
};
