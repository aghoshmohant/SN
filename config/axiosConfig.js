import axios from 'axios';

const instance = axios.create({

  baseURL: 'http://192.168.215.52:5000/api', // Adjust according to your server address


});

export default instance;