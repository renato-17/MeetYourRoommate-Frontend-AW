import http from './http-common'

class StudyCenterService{

    getByAll(){
        return http.get(`/studycenters`);
    }
    getById(id){
        return http.get(`/studycenters/${id}`);
    }
}

export default new StudyCenterService();
