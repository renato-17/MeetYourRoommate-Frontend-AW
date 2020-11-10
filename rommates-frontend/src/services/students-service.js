import http from './http-common'

class StudentsService{

    getById(id){
        return http.get(`/students/${id}`);
    }

}

export default new StudentsService();
