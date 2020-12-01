import http from './http-common';

class PropertyDetailsService {
    get(propertyId) {
        return http.get(`/properties/${propertyId}/propertydetails`)
    }
    create(propertyId,data) {
        return http.post(`/properties/${propertyId}/propertydetails`, data)
    }
    update(propertyId,data) {
        return http.put(`/properties/${propertyId}/propertydetails`, data)
    }
    delete(propertyId) {
        return http.delete(`/properties/${propertyId}/propertydetails`)
    }
}

export default new PropertyDetailsService();
