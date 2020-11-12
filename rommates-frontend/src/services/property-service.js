import http from './http-common';

class TutorialsService {
    getAll(lessorId) {
        return http.get(`/lessors/${lessorId}/properties`);
    }
    get(lessorId,id) {
        return http.get(`/lessors/${lessorId}/properties/${id}`)
    }
    create(lessorId,data) {
        return http.post(`/lessors/${lessorId}/properties`, data);
    }
    update(lessorId,id,data) {
        return http.put(`/lessors/${lessorId}/properties/${id}`,data);
    }
    delete(lessorId,id) {
        return http.delete(`/lessors/${lessorId}/properties/${id}`);
    }
}

export default new TutorialsService();
