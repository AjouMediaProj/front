import axios from 'axios';
import config from 'src/config';

export default axios.create({
    baseURL: config.apiURL,
    // headers: { withCredentials: true }, 필요한가..?
    withCredentials: true,
    timeout: 36000000,
});
