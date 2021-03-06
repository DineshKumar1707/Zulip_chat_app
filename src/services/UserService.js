import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/users";
const USER_MSG_API_BASE_URL = "http://localhost:8080/messages";
const OWN_USER_API_BASE_URL = "http://localhost:8080/ownUser"

class UserSerivce {

    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    getUsersMsg(mailId) {
        return axios.get(USER_MSG_API_BASE_URL+ '/' + mailId);
    }

    getOwnUser(){
        return axios.get(OWN_USER_API_BASE_URL)
    }

}

export default new UserSerivce()