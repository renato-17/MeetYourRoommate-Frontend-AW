import http from './http-common';

class LessorsService {
    getAll() {
        return http.get('/lessors');
    }
    get(id) {
        return http.get(`/lessors/${id}`)
    }
    create(data){
        return http.post(`/lessors`, {
            firstName: data.firstName,
            lastName: data.lastName,
            dni: data.dni,
            phone: data.phone,
            gender: data.gender,
            address: data.address,
            birthdate: data.birthdate,
            mail: data.mail,
            password: data.password,
            premium: data.premium
        });
    }
    update(id,data) {
        return http.put(`/lessors/${id}`,data);
    }
    delete(id) {
        return http.delete(`/lessors/${id}`);
    }
}

export default new LessorsService();
