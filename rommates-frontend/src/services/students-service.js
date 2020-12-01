import http from './http-common'

class StudentsService{

    getAll(){
        return http.get(`/students`);
    }
    getById(id){
        return http.get(`/students/${id}`);
    }
    create(data){
        return http.post(`/students`, {
            firstName: data.firstName,
            lastName: data.lastName,
            dni: data.dni,
            phone: data.phone,
            gender: data.gender,
            address: data.address,
            birthdate: data.birthdate,
            description: data.description,
            hobbies: data.hobbies,
            smoker: data.smoker,
            mail: data.mail,
            password: data.password,
            studyCenterId: data.studyCenterId,
            campusId: data.campusId
        });
    }
}

export default new StudentsService();
