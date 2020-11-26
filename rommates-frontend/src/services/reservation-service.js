import http from './http-common';

class ReservationService {
    getAll() {
        return http.get('/reservations');
    }
    get(id) {
        return http.get(`/reservations/${id}`)
    }
    create(data) {
        return http.post('/reservations', data);
    }
}

export default new ReservationService();
