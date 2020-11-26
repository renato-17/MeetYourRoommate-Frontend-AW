import http from './http-common';

class ReservationDetailsService {
    get(reservationId,id) {
        return http.get(`/reservation/${reservationId}/reservationdetail/${id}`)
    }
    create(id,data) {
        return http.post(`/reservation/${id}/reservationdetail`, data);
    }
}

export default new ReservationDetailsService();
