// auth-service.js

import axios from 'axios';

const API_URL = 'https://meetyourroommateapi.azurewebsites.net/api/people/authenticate';

class AuthService{
    login(user){
        return axios.post(API_URL, {
            mail: user.mail,
            password: user.password
        })
            .then(response =>{
                if(response.data.token){
                    console.log("user: "+ response.data);
                    localStorage.setItem('user', JSON.stringify(response));
                }
                return response.data;
            })
    }
    logout(){
        localStorage.removeItem('user');
    }
}

export default new AuthService();
