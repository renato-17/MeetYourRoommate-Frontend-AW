import http from './http-common';

class FriendRequestService {
    getAllReceivedFriendRequest(studentId) {
        return http.get(`/students/${studentId}/friendshiprequest/received`);
    }
    create(studentId,studentTwoId){
        return http.post(`/students/${studentId}/friendshiprequest/${studentTwoId}`);
    }
}

export default new FriendRequestService();
