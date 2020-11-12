import http from "./http-common"

class CampusService{
    getByStudyCenterId(id){
        return http.get(`/studycenters/${id}/campuses`);
    }
}

export default new CampusService();
