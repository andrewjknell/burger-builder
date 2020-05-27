import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-4df7e.firebaseio.com/'
});

export default instance;