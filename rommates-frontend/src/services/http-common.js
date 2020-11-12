import axios from 'axios';

export default axios.create({
    baseURL: 'https://roommateapiwebj.azurewebsites.net/api',
    headers: {
        'Content-type': 'application/json'
    }
});
