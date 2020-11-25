import http from './http-common';

class AdsService {
    getAll() {
        return http.get('/ads');
    }
    get(id) {
        return http.get(`/ads/${id}`)
    }
    create(data) {
        return http.post('/ads', data);
    }
    update(id,data) {
        return http.put(`/ads/${id}`,data);
    }
    delete(id) {
        return http.delete(`/ads/${id}`);
    }
}

export default new AdsService();
