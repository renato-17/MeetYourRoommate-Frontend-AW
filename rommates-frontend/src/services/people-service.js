import http from './http-common'

class PeopleService {

    getPersonByData(mail, password){
        let url =`/people?mail=${mail}&password=${password}`;
        return http.get(url);
    }
}

export default new PeopleService();
