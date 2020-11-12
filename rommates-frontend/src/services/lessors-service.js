import http from './http-common';

class LessorsService {
    getAll() {
        return http.get('/lessors');
    }
    get(id) {
        return http.get(`/lessors/${id}`)
    }
    create(data) {
        return http.post('/lessors', data);
    }
    update(id,data) {
        return http.put(`/lessors/${id}`,data);
    }
    delete(id) {
        return http.delete(`/lessors/${id}`);
    }
}

export default new LessorsService();