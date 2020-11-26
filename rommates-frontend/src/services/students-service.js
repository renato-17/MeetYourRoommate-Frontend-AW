import http from './http-common'

class StudentsService{
    getById(id){
        return http.get(`/students/${id}`);
    }
    create(data){
        return http.post(`/students`,data);
    }
}

export default new StudentsService();
