import axios from "axios";


export default axios.create({
    baseURL: 'https://meetyourroommate-api.azurewebsites.net/api/',
    headers: {
        'Content type': 'application/json'
    }
});

