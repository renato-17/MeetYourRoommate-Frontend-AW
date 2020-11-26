import http from './http-common';

class PropertyService {
    getAll() {
        return http.get('/properties');
    }
    get(id) {
        return http.get(`/properties/${id}`)
    }
    create(data) {
        return http.post(`/properties`, data);
    }
    update(id,data) {
        return http.put(`/properties/${id}`,data);
    }
    delete(id) {
        return http.delete(`/properties/${id}`);
    }
}

export default new PropertyService();
