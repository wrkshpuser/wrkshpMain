import axios from 'axios';
import {BASEURL} from './Statik';

const Request = axios.create({
    baseURL: BASEURL
});

export default Request;