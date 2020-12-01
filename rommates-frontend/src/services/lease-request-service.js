import http from './http-common';

class LeaseRequestService {
    getAllReceivedLeaseRequest(lessorId) {
        return http.get(`/lessors/${lessorId}/leaserequest/receive`)
    }
    update(id,lessorId, data) {
        return http.put(`/lessors/${lessorId}/leaserequest/${id}/`, data)
    }
    delete(studentId, id){
        return http.delete(`/students/${studentId}/leaserequest/${id}`)
    }
}

export default new LeaseRequestService();
