import http from './http-common'

class PeopleService {

    getPersonByData(mail, password){
        return http.get(`/people?mail=${mail},password=${password}`);
    }   

}

export default new PeopleService();
