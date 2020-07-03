import axios from "axios";
export default {
  // Gets all users-employees
  getUsers: function () {
    return axios.get("https://randomuser.me/api/?results=300&nat=us");
  },
};
